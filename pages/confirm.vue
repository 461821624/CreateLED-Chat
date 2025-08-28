<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()

const loading = ref(true)
const error = ref('')

// 处理登录确认
const handleAuthCallback = async () => {
  try {
    // 等待用户状态更新
    await new Promise(resolve => {
      const unwatch = watch(user, (newUser) => {
        if (newUser) {
          unwatch()
          resolve(newUser)
        }
      }, { immediate: true })
      
      // 如果5秒后还没有用户信息，停止等待
      setTimeout(() => {
        unwatch()
        resolve(null)
      }, 5000)
    })
    
    if (user.value) {
      // 登录成功，重定向到目标页面
      const redirectTo = route.query.redirect as string || '/'
      const platform = route.query.platform as string
      
      // 如果是从自定义平台登录页面来的，重定向回去并设置平台
      if (platform === 'custom' && redirectTo.includes('/chat/')) {
        await router.push(`${redirectTo}?platform=custom`)
      } else {
        await router.push(redirectTo)
      }
    } else {
      error.value = '登录验证失败，请重试'
    }
  } catch (err) {
    console.error('Auth callback error:', err)
    error.value = '登录过程中出现错误'
  } finally {
    loading.value = false
  }
}

// 重试登录
const retryLogin = () => {
  router.push('/login')
}

// 页面加载时处理回调
onMounted(() => {
  handleAuthCallback()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full">
      <UCard class="p-8">
        <div class="text-center">
          <!-- 加载状态 -->
          <div v-if="loading" class="space-y-4">
            <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 mx-auto text-blue-500 animate-spin" />
            <h2 class="text-xl font-semibold text-gray-900">正在验证登录...</h2>
            <p class="text-gray-600">请稍候，我们正在确认您的身份</p>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="error" class="space-y-4">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 mx-auto text-red-500" />
            <h2 class="text-xl font-semibold text-gray-900">登录验证失败</h2>
            <p class="text-gray-600">{{ error }}</p>
            <div class="flex gap-3 justify-center">
              <UButton color="primary" @click="retryLogin">
                重新登录
              </UButton>
              <UButton variant="outline" @click="$router.push('/')">
                返回首页
              </UButton>
            </div>
          </div>
          
          <!-- 成功状态 -->
          <div v-else class="space-y-4">
            <UIcon name="i-heroicons-check-circle" class="w-12 h-12 mx-auto text-green-500" />
            <h2 class="text-xl font-semibold text-gray-900">登录成功</h2>
            <p class="text-gray-600">正在跳转...</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>