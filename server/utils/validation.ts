import { z } from 'zod'

// 通用的分页参数验证
export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0)
})

// UUID 验证
export const uuidSchema = z.string().uuid('无效的ID格式')

// 会话相关验证模式
export const conversationSchemas = {
  create: z.object({
    owner: z.string().min(1, '用户ID不能为空').max(100, '用户ID长度不能超过100字符'),
    title: z.string().min(1, '会话标题不能为空').max(200, '标题长度不能超过200字符')
  }),
  
  update: z.object({
    title: z.string().min(1, '会话标题不能为空').max(200, '标题长度不能超过200字符').optional(),
    owner: z.string().min(1, '用户ID不能为空').max(100, '用户ID长度不能超过100字符').optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: '至少需要提供一个要更新的字段'
  }),
  
  query: z.object({
    owner: z.string().optional(),
    ...paginationSchema.shape
  })
}

// 消息相关验证模式
export const messageSchemas = {
  create: z.object({
    conversation_id: uuidSchema,
    role: z.enum(['user', 'assistant', 'system'], {
      errorMap: () => ({ message: '角色必须是 user、assistant 或 system' })
    }),
    content: z.string().min(1, '消息内容不能为空').max(10000, '消息内容长度不能超过10000字符'),
    metadata: z.record(z.any()).optional().default({}),
    token_count: z.number().int().min(0, 'token数量不能为负数').optional().default(0)
  }),
  
  update: z.object({
    content: z.string().min(1, '消息内容不能为空').max(10000, '消息内容长度不能超过10000字符').optional(),
    metadata: z.record(z.any()).optional(),
    token_count: z.number().int().min(0, 'token数量不能为负数').optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: '至少需要提供一个要更新的字段'
  }),
  
  query: z.object({
    conversation_id: uuidSchema,
    ...paginationSchema.shape
  })
}

// 验证工具函数
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: '请求数据格式错误',
      data: result.error.errors
    })
  }
  return result.data
}

// 验证路由参数
export function validateRouteParam(param: string | undefined, paramName: string): string {
  if (!param) {
    throw createError({
      statusCode: 400,
      statusMessage: `${paramName}不能为空`
    })
  }
  
  const result = uuidSchema.safeParse(param)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: `${paramName}格式无效`
    })
  }
  
  return result.data
}