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

    // 删除消息
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)

    if (error) {
      console.error('删除消息失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '删除消息失败'
      })
    }

    // 更新会话的最后更新时间
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', existingMessage.conversation_id)

    return {
      success: true,
      message: '消息删除成功'
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