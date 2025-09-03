import { serverSupabaseClient } from "#supabase/server"
import OpenAI from 'openai'
import {messages, messages_orm} from '~/utils/types'
// AI 平台配置类型定义
interface AIPlatform {
  id: number
  name: string
  base_url: string
  model: string
  api_key: string
  status: boolean
  created_at: string
}

// 扩展 OpenAI Delta 类型以支持 reasoning_content
interface ExtendedDelta {
  content?: string | null
  reasoning_content?: string | null
  role?: string
  function_call?: any
  tool_calls?: any
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message, platformId, conversationId } = body

    if (!message || !platformId || !conversationId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message, platformId and conversationId are required",
      })
    }

    // 获取 AI 平台配置
    const supabase = await serverSupabaseClient(event)
    const { data: platform, error } = await supabase
      .from("ai_platforms")
      .select("*")
      .eq("id", platformId)
      .single()
    // await supabase.from('messages').select()
    if (error || !platform) {
      throw createError({
        statusCode: 404,
        statusMessage: "AI platform not found",
      })
    }

    // 类型断言确保 platform 具有正确的类型
    const aiPlatform = platform as AIPlatform
    // ----- 首次对话生成标题 -----
    const { count: messageCount } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("conversation_id", conversationId)
    
    // 用于存储controller引用，以便在标题生成后发送事件
    let updateTitle: string | null = null
    
    if (messageCount === 0) {
         // 异步生成标题，不阻塞流式返回
         ;(async () => {
           try {
             const openai = new OpenAI({
               apiKey: aiPlatform.api_key,
               baseURL: aiPlatform.base_url,
             })
             const titleResp = await openai.chat.completions.create({
               model: aiPlatform.model,
               messages: [
                 {
                   role: "system",
                   content:
                     "请为以下对话提问概括生成一个简洁标题，不要出现标点符号，不要出现特殊字符。如：你好。”用户与助理初次问候“。10字以内",
                 },
                 { role: "user", content: message },
               ],
               stream: false,
             })
             const title =
               titleResp.choices[0]?.message?.content?.trim() || "新对话"
               const now = new Date().toISOString()
             // 更新 conversations 表
             await supabase
               .from("conversations")
               .update({ title, updated_at: now })
               .eq("id", conversationId)

               updateTitle = title
             console.log(updateTitle)
             // 标题更新已完成，不再通过流式发送
           } catch (err) {
             console.error("标题生成失败:", err)
           }
         })()
    }
    // 设置流式响应头
    setHeader(event, "Content-Type", "text/plain; charset=utf-8")
    setHeader(event, "Cache-Control", "no-cache")
    setHeader(event, "Connection", "keep-alive")
    setHeader(event, "Transfer-Encoding", "chunked")

    // 初始化 OpenAI 客户端
    const openai = new OpenAI({
      apiKey: aiPlatform.api_key,
      baseURL: aiPlatform.base_url,
    })

    // 获取当前会话的历史消息
    let messages: Array<{role: 'user' | 'assistant', content: string}> = []
    try {
      const { data: historyMessages, error: historyError } = await supabase
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
      
      if (historyError) {
        console.error('获取历史消息失败:', historyError)
      } else if (historyMessages && historyMessages.length > 0) {
        // 将历史消息转换为OpenAI API格式
        messages = historyMessages.map((msg:any) => {
          let content = ''
          try {
            const parsedContent = JSON.parse(msg.content)
            // 处理用户消息
            if (msg.role === 'user') {
              content = parsedContent.content || msg.content
            } else {
              // 处理AI回复，合并content和reasoning
              const aiContent = parsedContent.content || ''
              content = aiContent
            }
          } catch {
            // 如果解析失败，直接使用原始内容
            content = msg.content
          }
          return {
            role: msg.role as 'user' | 'assistant',
            content: content
          }
        })
      }
    } catch (error) {
      console.error('获取历史消息时发生错误:', error)
    }
    
    // 添加当前用户消息到消息数组末尾
    messages.push({
      role: "user",
      content: message,
    })

    // 创建流式响应
    const stream = await openai.chat.completions.create({
      model: aiPlatform.model,
      messages: messages,
      stream: true,
    })

    // 处理流式响应
    let fullResponse = ""
    let allContent = ""
    let allReasoning = ""
    // 定义 token 统计变量
    let totalTokens = 0
    let prompt_tokens = 0
    let completion_tokens = 0
    let chunk_id: string | null = null
    const encoder = new TextEncoder()

    return new ReadableStream({
      async start(controller) {
        // 保存controller引用，用于标题更新事件
        try {
          for await (const chunk of stream) {
            console.log(chunk)
            chunk_id = chunk.id
            // console.log(chunk.choices[0])
            // console.log(chunk.choices[0].delta)
            // { index: 0, // 索引
            //   delta: { content: '', reasoning_content: null }, // 增量内容
            //   logprobs: null, // 日志概率
            //   finish_reason: 'stop' } // 完成原因
            const delta = chunk.choices[0]?.delta as ExtendedDelta
            const content = delta?.content || ""
            const reasoning_content = delta?.reasoning_content
            const usage = chunk.usage
            if (content) {
              fullResponse += content
              allContent += content
              // 发送普通内容，添加类型标识
              const contentData =
                JSON.stringify({ type: "content", data: content }) + "\n"
              controller.enqueue(encoder.encode(contentData))
            }

            if (reasoning_content) {
              fullResponse += reasoning_content
              allReasoning += reasoning_content
              // 发送思考内容，添加类型标识
              const reasoningData =
                JSON.stringify({ type: "reasoning", data: reasoning_content }) +
                "\n"
              controller.enqueue(encoder.encode(reasoningData))
            }
            if(updateTitle) {
              const titleData =
                JSON.stringify({
                  type: "title",
                  data: { title: updateTitle, conversationId: conversationId },
                }) + "\n"
              controller.enqueue(encoder.encode(titleData))
            }
            if (usage) {
              // 更新token统计
              totalTokens = usage.total_tokens || 0
              prompt_tokens = usage.prompt_tokens || 0
              completion_tokens = usage.completion_tokens || 0
              // const usageData = JSON.stringify({ type: 'usage', data: usage }) + '\n'
              // controller.enqueue(encoder.encode(usageData))
            }
          }

          // 保存对话记录到messages数据库
          try {
            const now = new Date().toISOString()
            const prev = new Date(new Date(now).getTime() - 1000).toISOString()
            // 生成唯一ID的函数
            const generateId = () => crypto.randomUUID()
            
            // 保存用户消息
            const userMessage = {
              id: generateId(),
              conversation_id: conversationId,
              role: "user" as const,
              content: JSON.stringify({ content: message }),
              metadata: { platform_id: platformId },
              token_count: 0, // 用户消息暂时设为0
              created_at: prev, //now前一秒
            }
            let messagesObg = {
              content: '',
              reasoning: ''
            }
            if(allContent) {
              messagesObg.content = allContent
            }
            if(allReasoning) {
              messagesObg.reasoning=allReasoning 
            }
            // 保存AI回复
            const assistantMessage = {
              id: chunk_id || generateId(),
              conversation_id: conversationId,
              role: "assistant" as const,
              content: JSON.stringify(messagesObg),
              metadata: {
                platform_id: platformId,
                model: aiPlatform.model,
                total_tokens: totalTokens,
                prompt_tokens,
                completion_tokens,
              },
              token_count: totalTokens,
              created_at: now,
            }
            
            // 批量插入消息记录
            const { error: insertError } = await supabase
              .from('messages')
              .insert([userMessage, assistantMessage])
            
            if (insertError) {
              console.error('保存消息记录失败:', insertError)
            } else {
              console.log('消息记录保存成功')
            }
          } catch (saveError) {
            console.error('保存消息记录时发生错误:', saveError)
          }
          
          // 流结束
          controller.close()
          console.log("AI 请求成功完成，完整响应:", fullResponse)
        } catch (error) {
          console.error("AI 请求失败:", error)
          controller.error(error)
        }
      },
    })
  } catch (error) {
    console.error('API 处理错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: error
    })
  }
})