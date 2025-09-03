import { serverSupabaseClient } from "#supabase/server"
import { z } from 'zod'

// 创建消息的数据验证模式
const createMessageSchema = z.object({
  conversation_id: z.string().min(1, '会话ID不能为空'),
  role: z.enum(['user', 'assistant', 'system'], {
    errorMap: () => ({ message: '角色必须是 user、assistant 或 system' })
  }),
  content: z.string().min(1, '消息内容不能为空'),
  metadata: z.record(z.any()).optional(),
  token_count: z.number().int().min(0, 'token数量不能为负数').optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 验证请求数据
    const validationResult = createMessageSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: '请求数据格式错误',
        data: validationResult.error.errors
      })
    }

    const { conversation_id, role, content, metadata, token_count } = validationResult.data
    const supabase = await serverSupabaseClient(event)

    // 验证会话是否存在
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversation_id)
      .single()

    if (convError || !conversation) {
      throw createError({
        statusCode: 404,
        statusMessage: '会话不存在'
      })
    }

    // 创建新消息
    const { data: message, error } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id,
          role,
          content,
          metadata: metadata || {},
          token_count: token_count || 0,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('创建消息失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '创建消息失败'
      })
    }

    // 更新会话的最后更新时间
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversation_id)

    return {
      success: true,
      data: message,
      message: '消息创建成功'
    }
  } catch (error) {
    console.error('API 错误:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: '服务器内部错误'
    })
  }
})