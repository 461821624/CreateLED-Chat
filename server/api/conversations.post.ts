import { serverSupabaseClient } from "#supabase/server"
import { z } from 'zod'

// 创建会话的数据验证模式
const createConversationSchema = z.object({
  owner: z.uuid(),
  title: z.string().min(1, '会话标题不能为空').max(200, '标题长度不能超过200字符')
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 验证请求数据
    const validationResult = createConversationSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: '请求数据格式错误',
        data: validationResult.error
      })
    }

    const { title, owner } = validationResult.data
    const supabase = await serverSupabaseClient(event)
    console.log('owner', owner)
    console.log('title', title)
    const { data, error } = await supabase
      .from("conversations")
      .insert(
        {
          title,
          owner
        }
      )
      .select()
    if (error) {
      console.error('创建会话失败:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '创建会话失败'
      })
    }

    return {
      success: true,
      data,
      message: '会话创建成功'
    }
  } catch (error: any) {
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