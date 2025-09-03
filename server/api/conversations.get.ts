import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const query = getQuery(event)
    const { limit = 20, offset = 0 } = query

    // 构建查询
    let queryBuilder = supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false })


    // 添加分页
    queryBuilder = queryBuilder.range(Number(offset), Number(offset) + Number(limit) - 1)

    const { data: conversations, error } = await queryBuilder

    if (error) {
      console.error('获取会话列表失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '获取会话列表失败'
      })
    }

    return {
      success: true,
      data: conversations,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        total: conversations?.length || 0
      }
    }
  } catch (error) {
    console.error('API 错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '服务器内部错误'
    })
  }
})