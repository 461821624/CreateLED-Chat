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

    // 先删除相关的消息记录
    const { error: messagesError } = await supabase
      .from('messages')
      .delete()
      .eq('conversation_id', conversationId)

    if (messagesError) {
      console.error('删除会话消息失败:', messagesError)
      throw createError({
        statusCode: 500,
        statusMessage: '删除会话消息失败'
      })
    }

    // 删除会话
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)

    if (error) {
      console.error('删除会话失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '删除会话失败'
      })
    }

    return {
      success: true,
      message: '会话删除成功'
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