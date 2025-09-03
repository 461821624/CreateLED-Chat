import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    const conversationId = getRouterParam(event, 'id')
    
    if (!conversationId) {
      throw createError({
        statusCode: 400,
        statusMessage: '会话ID不能为空'
      })
    }

    const supabase = await serverSupabaseClient(event)

    // 获取会话详情
    const { data: conversation, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (error || !conversation) {
      throw createError({
        statusCode: 404,
        statusMessage: '会话不存在'
      })
    }

    return {
      success: true,
      data: conversation
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