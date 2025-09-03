import { serverSupabaseClient } from "#supabase/server"
import { z } from 'zod'

// 更新会话的数据验证模式
const updateConversationSchema = z.object({
  title: z.string().min(1, '会话标题不能为空').max(200, '标题长度不能超过200字符').optional(),
  owner: z.string().min(1, '用户ID不能为空').optional()
}).refine(data => Object.keys(data).length > 0, {
  message: '至少需要提供一个要更新的字段'
})

export default defineEventHandler(async (event) => {
  try {
    const conversationId = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!conversationId) {
      throw createError({
        statusCode: 400,
        statusMessage: '会话ID不能为空'
      })
    }

    // 验证请求数据
    const validationResult = updateConversationSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: '请求数据格式错误',
        data: validationResult.error.errors
      })
    }

    const updateData = validationResult.data
    const supabase = await serverSupabaseClient(event)

    // 检查会话是否存在
    const { data: existingConversation, error: checkError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .single()

    if (checkError || !existingConversation) {
      throw createError({
        statusCode: 404,
        statusMessage: '会话不存在'
      })
    }

    // 更新会话
    const { data: conversation, error } = await supabase
      .from('conversations')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId)
      .select()
      .single()

    if (error) {
      console.error('更新会话失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '更新会话失败'
      })
    }

    return {
      success: true,
      data: conversation,
      message: '会话更新成功'
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