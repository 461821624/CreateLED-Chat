<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const signInWithPassword = async () => {
  if (!email.value) {
    message.value = '请输入邮箱地址'
    messageType.value = 'error'
    return
  }
  
  if (!password.value) {
    message.value = '请输入密码'
    messageType.value = 'error'
    return
  }
  
  loading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    } else {
      message.value = '登录成功'
      messageType.value = 'success'
      // 登录成功后重定向
      await navigateTo('/chat/general')
    }
  } catch (err) {
    console.log(err)
    message.value = '登录失败，请重试'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/confirm`
      }
    })
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    }
  } catch (err) {
    console.log(err)
    message.value = 'Google登录失败，请重试'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`
const signInWithGithub = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo
      }
    })
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    }
  } catch (err) {
    console.log(err)
    message.value = 'GitHub登录失败，请重试'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登录您的账户
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          使用自定义AI平台需要登录
        </p>
      </div>

      <UCard class="p-6">
        <div class="space-y-6">
          <!-- 邮箱密码登录 -->
          <div class="space-y-4">
            <UFormField label="邮箱地址" name="email">
              <UInput
v-model="email" type="email" placeholder="请输入您的邮箱地址" icon="i-heroicons-envelope" size="lg"
                :disabled="loading" />
            </UFormField>

            <UFormField label="密码" name="password">
              <UInput
v-model="password" type="password" placeholder="请输入您的密码" icon="i-heroicons-lock-closed" size="lg"
                :disabled="loading" />
            </UFormField>
          </div>

          <UButton :loading="loading" block size="lg" color="primary" variant="solid" @click="signInWithPassword">
            登录
          </UButton>

          <!-- 分割线 -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或者</span>
            </div>
          </div>

          <!-- 社交登录 -->
          <div class="space-y-3">
            <UButton
:loading="loading" block size="lg" color="primary" variant="solid" icon="i-heroicons-globe-alt"
              @click="signInWithGoogle">
              使用 Google 登录
            </UButton>

            <UButton
:loading="loading" block size="lg" color="info" variant="solid" icon="i-heroicons-code-bracket"
              @click="signInWithGithub">
              使用 GitHub 登录
            </UButton>
          </div>

          <!-- 消息提示 -->
          <UAlert
v-if="message" :color="messageType === 'error' ? 'error' : 'success'" :title="message"
            variant="soft" />
        </div>
      </UCard>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          登录即表示您同意我们的
          <NuxtLink to="/terms" class="font-medium text-primary-600 hover:text-primary-500">
            服务条款
          </NuxtLink>
          和
          <NuxtLink to="/privacy" class="font-medium text-primary-600 hover:text-primary-500">
            隐私政策
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>