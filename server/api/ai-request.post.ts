import { serverSupabaseClient } from "#supabase/server"
import OpenAI from 'openai'

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
    const { message, platformId } = body

    if (!message || !platformId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message and platformId are required'
      })
    }

    // 获取 AI 平台配置
    const supabase = await serverSupabaseClient(event)
    const { data: platform, error } = await supabase
      .from('ai_platforms')
      .select('*')
      .eq('id', platformId)
      .single()

    if (error || !platform) {
      throw createError({
        statusCode: 404,
        statusMessage: 'AI platform not found'
      })
    }

    // 类型断言确保 platform 具有正确的类型
    const aiPlatform = platform as AIPlatform

    // 设置流式响应头
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setHeader(event, 'Transfer-Encoding', 'chunked')

    // 初始化 OpenAI 客户端
      const openai = new OpenAI({
        apiKey: aiPlatform.api_key,
        baseURL: aiPlatform.base_url,
      })

    // 创建流式响应
    const stream = await openai.chat.completions.create({
      model: aiPlatform.model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      stream: true
    })

    // 处理流式响应
    let fullResponse = ''
    const encoder = new TextEncoder()
    
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta as ExtendedDelta
            const content = delta?.content || ''
            const reasoning_content = delta?.reasoning_content
            
            if (content) {
              fullResponse += content
              // 发送普通内容，添加类型标识
              const contentData = JSON.stringify({ type: 'content', data: content }) + '\n'
              controller.enqueue(encoder.encode(contentData))
            }
            
            if (reasoning_content) {
              fullResponse += reasoning_content
              // 发送思考内容，添加类型标识
              const reasoningData = JSON.stringify({ type: 'reasoning', data: reasoning_content }) + '\n'
              controller.enqueue(encoder.encode(reasoningData))
            }
          }
          
          // 流结束
          controller.close()
          console.log('AI 请求成功完成，完整响应:', fullResponse)
        } catch (error) {
          console.error('AI 请求失败:', error)
          controller.error(error)
        }
      }
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