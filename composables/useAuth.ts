/**
 * 全局用户认证状态管理
 * 提供统一的用户状态访问和操作接口
 */
export const useAuth = () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const route = useRoute()
  
  // 检查用户是否已登录
  const isLoggedIn = computed(() => !!user.value)
  
  // 获取用户信息
  const userInfo = computed(() => {
    if (!user.value) return null
    
    return {
      id: user.value.id,
      email: user.value.email,
      emailVerified: user.value.email_confirmed_at,
      createdAt: user.value.created_at,
      lastSignIn: user.value.last_sign_in_at,
      avatar: user.value.user_metadata?.avatar_url,
      fullName: user.value.user_metadata?.full_name
    }
  })
  
  // 登录方法
  const signIn = async (email: string, options?: {
    redirectTo?: string
    captchaToken?: string
  }) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: options?.redirectTo || `${window.location.origin}/confirm`,
          captchaToken: options?.captchaToken
        }
      })
      
      if (error) throw error
      
      return { success: true, error: null }
    } catch (error: any) {
      console.error('登录失败:', error)
      return { success: false, error: error.message }
    }
  }
  
  // 社交登录方法
  const signInWithProvider = async (provider: 'google' | 'github', options?: {
    redirectTo?: string
  }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: options?.redirectTo || `${window.location.origin}/confirm`
        }
      })
      
      if (error) throw error
      
      return { success: true, error: null }
    } catch (error: any) {
      console.error(`${provider}登录失败:`, error)
      return { success: false, error: error.message }
    }
  }
  
  // 登出方法
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // 登出后重定向到首页
      await router.push('/')
      
      return { success: true, error: null }
    } catch (error: any) {
      console.error('登出失败:', error)
      return { success: false, error: error.message }
    }
  }
  
  // 检查是否需要登录访问某个功能
  const requireAuth = async (feature?: string, redirectTo?: string) => {
    if (!isLoggedIn.value) {
      const loginPath = redirectTo || '/login'
      const currentPath = route.fullPath
      
      await router.push({
        path: loginPath,
        query: {
          redirect: currentPath,
          feature
        }
      })
      
      return false
    }
    
    return true
  }
  
  // 检查用户是否有权限访问自定义平台
  const canAccessCustomPlatform = computed(() => {
    return isLoggedIn.value
  })
  
  // 获取用户显示名称
  const displayName = computed(() => {
    if (!user.value) return ''
    
    return userInfo.value?.fullName || 
           userInfo.value?.email?.split('@')[0] || 
           '用户'
  })
  
  // 获取用户头像
  const avatarUrl = computed(() => {
    return userInfo.value?.avatar || ''
  })
  
  // 监听认证状态变化
  const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
  
  return {
    // 状态
    user: readonly(user),
    userInfo: readonly(userInfo),
    isLoggedIn: readonly(isLoggedIn),
    canAccessCustomPlatform: readonly(canAccessCustomPlatform),
    displayName: readonly(displayName),
    avatarUrl: readonly(avatarUrl),
    
    // 方法
    signIn,
    signInWithProvider,
    signOut,
    requireAuth,
    onAuthStateChange
  }
}