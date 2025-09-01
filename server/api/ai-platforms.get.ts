import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    // 使用服务端 Supabase 客户端（具有 service role 权限）
    const supabase = await serverSupabaseClient(event)
    
    // 从数据库获取 AI 平台数据
    const { data: aiPlatformsData, error } = await supabase
      .from('ai_platforms')
      .select('*')
    
    if (error) {
      console.error('获取 AI 平台数据失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '获取 AI 平台数据失败'
      })
    }
    aiPlatformsData.forEach((item: any) => {
      //替换sk- 后面的为*
      item.apiKey = item.apiKey.replace(/sk-[a-zA-Z0-9]{32}/, (match: string) => {
        return match.replace(/[a-zA-Z0-9]/g, '*')
      })
    })
    // 返回数据，不暴露敏感信息
    return {
      success: true,
      data: aiPlatformsData
    }
  } catch (error) {
    console.error('API 错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '服务器内部错误'
    })
  }
})