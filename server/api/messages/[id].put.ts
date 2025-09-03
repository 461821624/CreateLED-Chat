import { serverSupabaseClient } from "#supabase/server"
import { z } from 'zod'

// 更新消息的数据验证模式
const updateMessageSchema = z.object({
  content: z.string().min(1, '消息内容不能为空').optional(),
  metadata: z.record(z.any()).optional(),
  token_count: z.number().int().min(0, 'token数量不能为负数').optional()
}).refine(data => Object.keys(data).length > 0, {
  message: '至少需要提供一个要更新的字段'
})

export default defineEventHandler(async (event) => {
  try {
    const messageId = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!messageId) {
      throw createError({
        statusCode: 400,
        statusMessage: '消息ID不能为空'
      })
    }

    // 验证请求数据
    const validationResult = updateMessageSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: '请求数据格式错误',
        data: validationResult.error.errors
      })
    }

    const updateData = validationResult.data
    const supabase = await serverSupabaseClient(event)

    // 检查消息是否存在并获取会话ID
    const { data: existingMessage, error: checkError } = await supabase
      .from('messages')
      .select('id, conversation_id')
      .eq('id', messageId)
      .single()

    if (checkError || !existingMessage) {
      throw createError({
        statusCode: 404,
        statusMessage: '消息不存在'
      })
    }

    // 更新消息
    const { data: message, error } = await supabase
      .from('messages')
      .update(updateData)
      .eq('id', messageId)
      .select()
      .single()

    if (error) {
      console.error('更新消息失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '更新消息失败'
      })
    }

    // 更新会话的最后更新时间
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', existingMessage.conversation_id)

    return {
      success: true,
      data: message,
      message: '消息更新成功'
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