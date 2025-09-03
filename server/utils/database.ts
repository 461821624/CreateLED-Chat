import { serverSupabaseClient } from "#supabase/server"
import type { H3Event } from 'h3'
import { handleSupabaseError, createApiError } from './error-handler'

// 获取 Supabase 客户端
export async function getSupabaseClient(event: H3Event) {
  return await serverSupabaseClient(event)
}

// 检查资源是否存在
export async function checkResourceExists(
  event: H3Event,
  table: string,
  id: string,
  errorType: 'CONVERSATION_NOT_FOUND' | 'MESSAGE_NOT_FOUND' = 'CONVERSATION_NOT_FOUND'
) {
  const supabase = await getSupabaseClient(event)
  
  const { data, error } = await supabase
    .from(table)
    .select('id')
    .eq('id', id)
    .single()

  if (error || !data) {
    createApiError(errorType)
  }
  
  return data
}

// 检查会话是否存在
export async function checkConversationExists(event: H3Event, conversationId: string) {
  return await checkResourceExists(event, 'conversations', conversationId, 'CONVERSATION_NOT_FOUND')
}

// 检查消息是否存在并返回会话ID
export async function checkMessageExists(event: H3Event, messageId: string) {
  const supabase = await getSupabaseClient(event)
  
  const { data, error } = await supabase
    .from('messages')
    .select('id, conversation_id')
    .eq('id', messageId)
    .single()

  if (error || !data) {
    createApiError('MESSAGE_NOT_FOUND')
  }
  
  return data
}

// 更新会话的最后更新时间
export async function updateConversationTimestamp(event: H3Event, conversationId: string) {
  const supabase = await getSupabaseClient(event)
  
  const { error } = await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  if (error) {
    console.warn('更新会话时间戳失败:', error)
    // 这里不抛出错误，因为这不是关键操作
  }
}

// 获取会话列表
export async function getConversations(
  event: H3Event,
  filters: { owner?: string; limit: number; offset: number }
) {
  const supabase = await getSupabaseClient(event)
  const { owner, limit, offset } = filters

  let queryBuilder = supabase
    .from('conversations')
    .select('*')
    .order('updated_at', { ascending: false })

  if (owner) {
    queryBuilder = queryBuilder.eq('owner', owner)
  }

  queryBuilder = queryBuilder.range(offset, offset + limit - 1)

  const { data, error } = await queryBuilder

  if (error) {
    handleSupabaseError(error, '获取会话列表')
  }

  return data || []
}

// 获取消息列表
export async function getMessages(
  event: H3Event,
  filters: { conversation_id: string; limit: number; offset: number }
) {
  const supabase = await getSupabaseClient(event)
  const { conversation_id, limit, offset } = filters

  // 先检查会话是否存在
  await checkConversationExists(event, conversation_id)

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversation_id)
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) {
    handleSupabaseError(error, '获取消息列表')
  }

  return data || []
}

// 删除会话及其所有消息
export async function deleteConversationWithMessages(event: H3Event, conversationId: string) {
  const supabase = await getSupabaseClient(event)
  
  // 先检查会话是否存在
  await checkConversationExists(event, conversationId)

  // 删除相关的消息记录
  const { error: messagesError } = await supabase
    .from('messages')
    .delete()
    .eq('conversation_id', conversationId)

  if (messagesError) {
    handleSupabaseError(messagesError, '删除会话消息')
  }

  // 删除会话
  const { error: conversationError } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId)

  if (conversationError) {
    handleSupabaseError(conversationError, '删除会话')
  }
}
export type DatabaseConversations = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          owner: string
          title: string
          updated_at: string
          created_at: string
          // 这里补全你的表结构
        }
        Insert: {
          id?: string
          owner?: string
          title?: string
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          owner?: string
          title?: string
          updated_at?: string
          created_at?: string
        }
      }
    }
  }
}