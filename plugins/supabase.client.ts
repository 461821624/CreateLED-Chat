export default defineNuxtPlugin(async () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  // 确保在客户端初始化时获取用户状态
  if (process.client) {
    try {
      // 获取当前会话
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('获取用户会话失败:', error)
      } else if (session) {
        console.log('用户已登录:', session.user.email)
      } else {
        console.log('用户未登录')
      }
    } catch (error) {
      console.error('初始化用户状态失败:', error)
    }
  }
  
  // 提供全局的用户状态检查方法
  return {
    provide: {
      checkAuthStatus: async () => {
        try {
          const { data: { user }, error } = await supabase.auth.getUser()
          if (error) throw error
          return user
        } catch (error) {
          console.error('检查认证状态失败:', error)
          return null
        }
      },
      
      requireAuth: async (redirectTo = '/login') => {
        const currentUser = user.value
        if (!currentUser) {
          await navigateTo({
            path: redirectTo,
            query: {
              redirect: useRoute().fullPath
            }
          })
          return false
        }
        return true
      }
    }
  }
})