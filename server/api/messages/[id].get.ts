import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    const messageId = getRouterParam(event, 'id')
    
    if (!messageId) {
      throw createError({
        statusCode: 400,
        statusMessage: '消息ID不能为空'
      })
    }

    const supabase = await serverSupabaseClient(event)

    // 获取消息详情
    const { data: message, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', messageId)
      .single()

    if (error || !message) {
      throw createError({
        statusCode: 404,
        statusMessage: '消息不存在'
      })
    }

    return {
      success: true,
      data: message
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