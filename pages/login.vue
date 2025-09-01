<script setup lang="ts">
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons-vue'

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const emailSent = ref(false)

const sendMagicLink = async () => {
  if (!email.value) {
    message.value = '请输入邮箱地址'
    messageType.value = 'error'
    return
  }
  
  loading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        shouldCreateUser: true
      }
    })
    
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    } else {
      message.value = '登录链接已发送到您的邮箱，请检查邮箱并点击链接完成登录'
      messageType.value = 'success'
      emailSent.value = true
    }
  } catch (err) {
    console.log(err)
    message.value = '发送登录链接失败，请重试'
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
          <!-- 邮箱魔法链接登录 -->
          <div class="space-y-4">
            <UFormField label="邮箱地址" name="email">
              <UInput
v-model="email" type="email" placeholder="请输入您的邮箱地址" icon="i-heroicons-envelope" size="lg"
                :disabled="loading" />
            </UFormField>

            <UButton
:loading="loading" block size="lg" color="primary" variant="solid" :disabled="!email || emailSent"
              @click="sendMagicLink">
              {{ emailSent ? '打开邮件完成登录' : '发送登录链接' }}
            </UButton>
          </div>

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
            <UButton :loading="loading" block size="lg" color="primary" variant="solid" @click="signInWithGoogle">
              <template #leading>
                <GoogleOutlined />
              </template>
              使用 Google 登录
            </UButton>

            <UButton :loading="loading" block size="lg" color="info" variant="solid" @click="signInWithGithub">
              <template #leading>
                <GithubOutlined />
              </template>
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