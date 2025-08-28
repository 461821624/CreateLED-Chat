export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  // 如果用户未登录，重定向到登录页面
  if (!user.value) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})