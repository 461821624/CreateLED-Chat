import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const query = getQuery(event)
    const { conversation_id, limit = 50, offset = 0 } = query

    if (!conversation_id) {
      throw createError({
        statusCode: 400,
        statusMessage: '会话ID不能为空'
      })
    }

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

    // 获取消息列表
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    if (error) {
      console.error('获取消息列表失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '获取消息列表失败'
      })
    }
    // 解析消息内容
    messages.forEach((item:any) => {
      item.content = JSON.parse(item.content)
    })
    return {
      success: true,
      data: messages,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        total: messages?.length || 0
      }
    }
  } catch (error) {
    console.error('API 错误:', error)
    if (error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: '服务器内部错误'
    })
  }
})