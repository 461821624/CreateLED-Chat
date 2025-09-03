// 错误类型定义
export interface ApiError {
  statusCode: number
  statusMessage: string
  data?: any
}

// 预定义的错误类型
export const ErrorTypes = {
  VALIDATION_ERROR: {
    statusCode: 400,
    statusMessage: '请求数据格式错误'
  },
  NOT_FOUND: {
    statusCode: 404,
    statusMessage: '资源不存在'
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    statusMessage: '服务器内部错误'
  },
  CONVERSATION_NOT_FOUND: {
    statusCode: 404,
    statusMessage: '会话不存在'
  },
  MESSAGE_NOT_FOUND: {
    statusCode: 404,
    statusMessage: '消息不存在'
  },
  CONVERSATION_CREATE_FAILED: {
    statusCode: 500,
    statusMessage: '创建会话失败'
  },
  CONVERSATION_UPDATE_FAILED: {
    statusCode: 500,
    statusMessage: '更新会话失败'
  },
  CONVERSATION_DELETE_FAILED: {
    statusCode: 500,
    statusMessage: '删除会话失败'
  },
  MESSAGE_CREATE_FAILED: {
    statusCode: 500,
    statusMessage: '创建消息失败'
  },
  MESSAGE_UPDATE_FAILED: {
    statusCode: 500,
    statusMessage: '更新消息失败'
  },
  MESSAGE_DELETE_FAILED: {
    statusCode: 500,
    statusMessage: '删除消息失败'
  },
  MESSAGES_DELETE_FAILED: {
    statusCode: 500,
    statusMessage: '删除会话消息失败'
  }
} as const

// 创建标准化错误
export function createApiError(errorType: keyof typeof ErrorTypes, data?: any): never {
  const error = ErrorTypes[errorType]
  throw createError({
    ...error,
    data
  })
}

// 处理 Supabase 错误
export function handleSupabaseError(error: any, operation: string): never {
  console.error(`${operation}失败:`, error)
  
  // 根据 Supabase 错误码进行分类处理
  if (error.code === 'PGRST116') {
    // 记录不存在
    throw createError({
      statusCode: 404,
      statusMessage: '资源不存在'
    })
  }
  
  if (error.code === '23505') {
    // 唯一约束违反
    throw createError({
      statusCode: 409,
      statusMessage: '数据冲突，资源已存在'
    })
  }
  
  if (error.code === '23503') {
    // 外键约束违反
    throw createError({
      statusCode: 400,
      statusMessage: '关联数据不存在'
    })
  }
  
  // 默认服务器错误
  throw createError({
    statusCode: 500,
    statusMessage: `${operation}失败`
  })
}

// 统一的错误处理包装器
export function withErrorHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error: any) {
      console.error('API 错误:', error)
      
      // 如果已经是格式化的错误，直接抛出
      if (error.statusCode) {
        throw error
      }
      
      // 未知错误，返回通用服务器错误
      throw createError({
        statusCode: 500,
        statusMessage: '服务器内部错误'
      })
    }
  }
}

// 成功响应格式化
export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true,
    data,
    ...(message && { message })
  }
}

// 分页响应格式化
export function createPaginatedResponse<T>(
  data: T[],
  pagination: { limit: number; offset: number; total?: number }
) {
  return {
    success: true,
    data,
    pagination
  }
}