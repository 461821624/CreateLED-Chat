<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 全局加载状态 -->
    <div v-if="pending" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="text-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 mx-auto mb-3 text-blue-500 animate-spin" />
        <p class="text-sm text-gray-600">正在加载...</p>
      </div>
    </div>

    <!-- 页面内容 -->
    <slot />

  </div>
</template>

<script setup lang="ts">
// 全局用户状态管理
const supabase = useSupabaseClient()
const pending = ref(false)
const toast = useToast()

// 仅在客户端执行认证状态监听
if (import.meta.client) {
  // 监听认证状态变化
  supabase.auth.onAuthStateChange((event, session) => {
    // 根据认证事件显示通知
    switch (event) {
      case 'SIGNED_IN':
        if (session?.user?.email) {
          // 延迟显示通知，避免页面跳转时的闪烁
          setTimeout(() => {
            toast.add({
              title: '登录成功',
              description: `欢迎回来，${session.user.email}`,
              icon: 'i-heroicons-check-circle',
              color: 'success'
            })
          }, 500)
        }
        break
      case 'SIGNED_OUT':
        toast.add({
          title: '已退出登录',
          description: '您已安全退出账户',
          icon: 'i-heroicons-information-circle',
          color: 'error'
        })
        break
      case 'TOKEN_REFRESHED':
        // Token刷新成功，无需显示通知
        break
    }
  })
}

// 全局错误处理
const handleGlobalError = (error: Error) => {
  console.error('Global error:', error)
  toast.add({
    title: '发生错误',
    description: error.message || '未知错误',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'error'
  })
}

// 提供全局错误处理方法
provide('handleError', handleGlobalError)

// 页面元数据
useHead({
  titleTemplate: '%s - AI Chat Platform',
  meta: [
    { name: 'description', content: 'AI聊天平台，支持多种AI助手' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// 仅在客户端监听路由变化
if (import.meta.client) {
  const router = useRouter()
  router.beforeEach(() => {
    pending.value = true
  })

  router.afterEach(() => {
    // 延迟隐藏加载状态，确保页面渲染完成
    setTimeout(() => {
      pending.value = false
    }, 100)
  })
}

// 组件挂载时初始化
onMounted(() => {
  pending.value = false
})
</script>

<style scoped>
/* 自定义样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>