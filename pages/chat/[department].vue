<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- 页面头部 -->
    <header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <UButton
icon="i-heroicons-arrow-left" variant="ghost" size="md"
              class="hover:bg-blue-50 transition-all duration-200" @click="handleGoBack">
              返回首页
            </UButton>
            <div class="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div>
              <h1 class="text-lg font-semibold text-gray-800">AI平台访问</h1>
              <p class="text-xs text-gray-500">{{ currentTime }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <!-- AI平台选择器 -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">AI平台:</span>
              <UBadge :color="selectedPlatform ? 'primary' : 'info'" variant="soft" size="sm">
                {{ aiPlatforms.length }} 个可用
              </UBadge>
              <USelect
v-model="selectedPlatform" :items="aiPlatforms" option-attribute="label" value-attribute="value"
                placeholder="请选择AI平台" size="sm" class="w-48 bg-white" :loading="isLoadingPlatform"
                @change="handlePlatformChange" />
            </div>
            <div class="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div class="flex items-center gap-2">
              <div :class="connectionStatusClass" />
              <span class="text-sm text-gray-600">{{ connectionStatus }}</span>
            </div>

            <!-- 用户状态显示 -->
            <div class="flex items-center gap-2">
              <template v-if="user">
                <UAvatar :alt="user.email" size="sm" :ui="{ root: 'bg-primary-500' }">
                  {{ user.email?.charAt(0).toUpperCase() }}
                </UAvatar>
                <UDropdownMenu
:items="items" :ui="{
                  content: 'w-48'
                }">
                  <UButton
variant="ghost" size="sm" :label="user.email" trailing-icon="i-heroicons-chevron-down"
                    class="max-w-32 truncate" />
                </UDropdownMenu>
              </template>
              <template v-else>
                <UButton variant="outline" size="sm" icon="i-heroicons-user" @click="$router.push('/login')">
                  登录
                </UButton>
              </template>
            </div>

            <UButton
icon="i-heroicons-arrow-path" variant="outline" size="sm" :loading="isRefreshing"
              @click="refreshPage">
              刷新
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-6 h-[calc(100vh-140px)]">
        <!-- 侧边栏 - 只在选择自定义平台时显示 -->
        <aside
v-if="selectedPlatform === 'custom'"
          class="w-80 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 transition-all duration-300">
          <div class="space-y-6">
            <!-- 平台信息 -->
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">自定义AI平台</h3>
              <p class="text-sm text-gray-600">您可以在此配置自定义AI助手</p>
            </div>

            <!-- 自定义配置选项 -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">平台名称</label>
                <UInput placeholder="输入自定义平台名称" size="sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">平台URL</label>
                <UInput placeholder="输入平台访问地址" size="sm" />
              </div>
              <UButton variant="soft" size="sm" class="w-full">
                保存配置
              </UButton>
            </div>
          </div>
        </aside>

        <!-- AI平台页面区域 -->
        <div
:class="[
          'bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex flex-col transition-all duration-300',
          selectedPlatform === 'custom' ? 'flex-1' : 'w-full'
        ]">
          <!-- 平台头部 -->
          <div class="p-4 border-b border-gray-200 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div>
                  <h2 class="text-lg font-semibold text-gray-800">AI助手界面</h2>
                  <p class="text-sm text-gray-600">{{ proxyUrl ? currentPlatformInfo?.label || '加载中...' : '请选择平台开始使用' }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div :class="iframeStatusClass" />
                  <span class="text-sm text-gray-600">{{ iframeStatus }}</span>
                </div>
                <div v-if="loadingProgress > 0 && loadingProgress < 100" class="flex items-center gap-2">
                  <div class="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
class="h-full bg-blue-500 transition-all duration-300 ease-out"
                      :style="{ width: `${loadingProgress}%` }" />
                  </div>
                  <span class="text-xs text-gray-500">{{ loadingProgress.toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 平台页面内容区域 -->
          <div class="flex-1 p-4">
            <div class="relative h-full bg-gray-50 rounded-lg overflow-hidden">
              <!-- 加载状态 -->
              <div
v-if="isLoading"
                class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div class="text-center">
                  <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 mx-auto mb-3 text-blue-500 animate-spin" />
                  <p class="text-sm text-gray-600 mb-2">正在加载 {{ currentPlatformInfo?.label }}...</p>
                  <div class="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div class="h-full bg-blue-500 rounded-full animate-pulse" style="width: 60%" />
                  </div>
                </div>
              </div>

              <!-- 错误状态 -->
              <div v-else-if="hasError" class="absolute inset-0 flex items-center justify-center">
                <div class="text-center max-w-md">
                  <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <h3 class="text-lg font-medium text-gray-800 mb-2">加载失败</h3>
                  <p class="text-sm text-gray-600 mb-4">{{ errorMessage }}</p>
                  <div class="flex gap-2 justify-center">
                    <UButton variant="outline" size="sm" @click="refreshPage">
                      重试
                    </UButton>
                    <UButton variant="ghost" size="sm" @click="openInNewTab">
                      新窗口打开
                    </UButton>
                  </div>
                </div>
              </div>

              <!-- iframe - 非自定义平台时显示 -->
              <iframe
v-show="proxyUrl && !isLoading && !hasError && selectedPlatform !== 'custom'" ref="iframeRef" :src="proxyUrl"
                class="w-full h-full border-0" :title="selectedPlatform ? `${selectedPlatform} 平台页面` : 'AI平台页面'"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads"
                @load="handleIframeLoad" @error="handleIframeError" />

              <!-- 自定义对话窗口 - 仅在选择自定义平台时显示 -->
              <div v-if="selectedPlatform === 'custom' && !isLoading && !hasError" class="h-full flex flex-col bg-white rounded-lg">
                <!-- 对话消息列表 -->
                <div class="flex-1 p-4 overflow-y-auto space-y-4">
                  <div v-if="chatMessages.length === 0" class="flex items-center justify-center h-full text-gray-500">
                    <div class="text-center">
                      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p class="text-lg font-medium mb-2">开始对话</p>
                      <p class="text-sm">输入您的问题，开始与AI助手对话</p>
                    </div>
                  </div>
                  
                  <!-- 消息列表 -->
                  <div
v-for="message in chatMessages" :key="message.id" class="flex gap-3" :class="{
                    'flex-row-reverse': message.role === 'user'
                  }">
                    <UAvatar
                      :alt="message.role === 'user' ? '用户' : 'AI助手'"
                      size="sm"
                      :ui="{
                        root: message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                      }"
                    >
                      <UIcon :name="message.role === 'user' ? 'i-heroicons-user' : 'i-heroicons-cpu-chip'" class="w-4 h-4 text-white" />
                    </UAvatar>
                    <div class="flex-1 max-w-[80%]">
                      <div
:class="[
                        'px-4 py-3 rounded-lg text-sm',
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white ml-auto' 
                          : 'bg-gray-100 text-gray-800'
                      ]">
                        <p class="whitespace-pre-wrap">{{ message.content }}</p>
                      </div>
                      <p
class="text-xs text-gray-500 mt-1" :class="{
                        'text-right': message.role === 'user'
                      }">
                        {{ formatTime(message.timestamp) }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- AI正在输入指示器 -->
                  <div v-if="isAiTyping" class="flex gap-3">
                    <UAvatar size="sm" :ui="{ root: 'bg-purple-500' }">
                      <UIcon name="i-heroicons-cpu-chip" class="w-4 h-4 text-white" />
                    </UAvatar>
                    <div class="flex-1">
                      <div class="bg-gray-100 px-4 py-3 rounded-lg text-sm text-gray-800 max-w-[80%]">
                        <div class="flex items-center gap-1">
                          <span>AI正在思考</span>
                          <div class="flex gap-1">
                            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"/>
                            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"/>
                            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 输入区域 -->
                <div class="border-t border-gray-200 p-4">
                  <div class="flex gap-3">
                    <UTextarea
                      v-model="currentMessage"
                      placeholder="输入您的问题..."
                      :rows="1"
                      :maxrows="4"
                      class="flex-1"
                      :disabled="isAiTyping"
                      @keydown.enter.exact.prevent="sendMessage"
                      @keydown.enter.shift.exact="() => {}"
                    />
                    <UButton
                      icon="i-heroicons-paper-airplane"
                      size="sm"
                      :disabled="!currentMessage.trim() || isAiTyping"
                      :loading="isAiTyping"
                      @click="sendMessage"
                    >
                      发送
                    </UButton>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">
                    按 Enter 发送，Shift + Enter 换行
                  </p>
                </div>
              </div>

              <!-- 空状态 -->
              <div v-if="!proxyUrl && !isLoading" class="flex items-center justify-center h-full text-gray-500">
                <div class="text-center">
                  <UIcon name="i-heroicons-computer-desktop" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p class="text-lg font-medium mb-2">请选择AI平台</p>
                  <p class="text-sm mb-4">从选择一个AI平台开始使用</p>
                  <UButton v-if="aiPlatforms.length > 0" variant="soft" size="sm" @click="selectFirstPlatform">
                    选择 {{ aiPlatforms[0]?.label }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Platform } from '../../utils/types'
import type { DropdownMenuItem } from '@nuxt/ui'

// 定义组件名称以符合ESLint规范
defineOptions({
  name: 'DepartmentChat'
})

// 路由参数和用户状态
const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// 响应式数据
const selectedPlatform = ref('qwen')
const isLoading = ref(false)
const isRefreshing = ref(false)
const isLoadingPlatform = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const loadingProgress = ref(0)
const currentTime = ref('')
const iframeRef = useTemplateRef<HTMLIFrameElement>('iframeRef')

// 自定义对话窗口相关数据
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const chatMessages = ref<ChatMessage[]>([])
const currentMessage = ref('')
const isAiTyping = ref(false)
// 状态管理
const connectionStatus = ref('已连接')
const iframeStatus = ref('等待加载')
// const userMenuItems = ref<DropdownMenuItem[]>([])
//   userMenuItems.value = [
//     [{
//       label: user.value?.email || '用户',
//       slot: 'account',
//       disabled: true
//     }],
//     [{
//       label: '退出登录',
//       icon: 'i-heroicons-arrow-right-on-rectangle',
//       click: () => handleLogout()
//     }],
//   ]
const items = ref<DropdownMenuItem[]>([])
items.value = [
  [
    {
      label: user.value?.email,
      avatar: {
        src: user.value?.user_metadata.avatar_url || ''
      },
      type: 'label'
    }
  ],
  // [
  //   {
  //     label: 'Profile',
  //     icon: 'i-lucide-user'
  //   },
  //   {
  //     label: 'Billing',
  //     icon: 'i-lucide-credit-card'
  //   },
  //   {
  //     label: 'Settings',
  //     icon: 'i-lucide-cog',
  //     kbds: [',']
  //   },
  //   {
  //     label: 'Keyboard shortcuts',
  //     icon: 'i-lucide-monitor'
  //   }
  // ],
  // [
  //   {
  //     label: 'Team',
  //     icon: 'i-lucide-users'
  //   },
  //   {
  //     label: 'Invite users',
  //     icon: 'i-lucide-user-plus',
  //     children: [
  //       [
  //         {
  //           label: 'Email',
  //           icon: 'i-lucide-mail'
  //         },
  //         {
  //           label: 'Message',
  //           icon: 'i-lucide-message-square'
  //         }
  //       ],
  //       [
  //         {
  //           label: 'More',
  //           icon: 'i-lucide-circle-plus'
  //         }
  //       ]
  //     ]
  //   },
  //   {
  //     label: 'New team',
  //     icon: 'i-lucide-plus',
  //     kbds: ['meta', 'n']
  //   }
  // ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      onSelect: () => handleLogout()
    }
  ]
]
// 用户菜单项
// const userMenuItems = computed(() => [
//   [{
//     label: user.value?.email || '用户',
//     slot: 'account',
//     disabled: true
//   }],
//   [{
//     label: '个人设置',
//     icon: 'i-heroicons-cog-6-tooth',
//     click: () => {
//       // 可以添加个人设置页面
//       console.log('打开个人设置')
//     }
//   }],
//   [{
//     label: '退出登录',
//     icon: 'i-heroicons-arrow-right-on-rectangle',
//     click: handleLogout
//   }]
// ])

// 登出功能
const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    // 如果当前在自定义平台，切换到默认平台
    if (selectedPlatform.value === 'custom') {
      selectedPlatform.value = 'qwen'
      await handlePlatformChange()
    }
  } catch (error) {
    console.error('登出失败:', error)
  }
}

// AI平台数据 - 使用响应式数据确保SSR/CSR一致性
const aiPlatforms = ref<Platform[]>([
  { 
    label: '文心一言', 
    value: 'wenxin', 
    url: 'https://yiyan.baidu.com',
    icon: 'i-simple-icons-baidu',
    description: '百度开发的大语言模型'
  },
  { 
    label: 'Kimi', 
    value: 'kimi', 
    url: 'https://kimi.moonshot.cn',
    icon: 'i-heroicons-moon',
    description: '月之暗面开发的AI助手'
  },
  // 自定义平台
  {
    label: '自定义',
    value: 'custom',
    url: 'https://www.custom.com',
    icon: 'i-heroicons-cube',
    description: '自定义AI助手'
  }
])

// 白名单：这些平台不走代理，直接访问
const whitelistPlatforms = ['wenxin', 'kimi']

// 计算属性
const currentPlatformInfo = computed(() => {
  if (!selectedPlatform.value) return null
  return aiPlatforms.value.find(p => p.value === selectedPlatform.value)
})

const proxyUrl = computed(() => {
  if (!currentPlatformInfo.value) return ''
  
  // 检查是否在白名单中
  if (whitelistPlatforms.includes(selectedPlatform.value)) {
    // 白名单平台直接返回原始URL
    return currentPlatformInfo.value.url
  }
  
  // DeepSeek平台使用专用代理路径
  if (selectedPlatform.value === 'deepseek') {
    return `/${selectedPlatform.value}`
  }
  if (selectedPlatform.value === 'doubao') {
    return `/${selectedPlatform.value}`
  }
  // 其他非白名单平台使用通用代理
  const targetUrl = currentPlatformInfo.value.url
  return `/api/proxy?url=${targetUrl}`
})

const connectionStatusClass = computed(() => ({
  'w-2 h-2 rounded-full': true,
  'bg-green-400 animate-pulse': connectionStatus.value === '已连接',
  'bg-yellow-400': connectionStatus.value === '连接中',
  'bg-red-400': connectionStatus.value === '连接失败'
}))

const iframeStatusClass = computed(() => ({
  'w-2 h-2 rounded-full': true,
  'bg-green-400': iframeStatus.value === '加载完成',
  'bg-blue-400 animate-pulse': iframeStatus.value === '加载中',
  'bg-red-400': iframeStatus.value === '加载失败',
  'bg-gray-400': iframeStatus.value === '等待加载'
}))



const handleGoBack = () => {
  router.push('/')
}

const handlePlatformChange = async () => {
  if (!selectedPlatform.value) return
  
  // 检查自定义平台是否需要登录
  if (selectedPlatform.value === 'custom' && !user.value) {
    // 未登录用户选择自定义平台，重定向到登录页面
    await navigateTo({
      path: '/login',
      query: {
        redirect: route.fullPath,
        platform: 'custom'
      }
    })
    return
  }
  
  isLoadingPlatform.value = true
  hasError.value = false
  errorMessage.value = ''
  
  try {
    await loadPlatform()
  } catch (error) {
    console.error('平台切换失败:', error)
    hasError.value = true
    errorMessage.value = '平台切换失败，请重试'
  } finally {
    isLoadingPlatform.value = false
  }
}

const loadPlatform = async () => {
  if (!currentPlatformInfo.value) return
  
  isLoading.value = true
  iframeStatus.value = '加载中'
  loadingProgress.value = 0
  
  // 模拟加载进度
  const progressInterval = setInterval(() => {
    if (loadingProgress.value < 90) {
      loadingProgress.value += Math.random() * 20
    }
  }, 200)
  
  try {
    await nextTick()
    // 等待iframe开始加载
    setTimeout(() => {
      clearInterval(progressInterval)
      loadingProgress.value = 100
      setTimeout(() => {
        isLoading.value = false
        iframeStatus.value = '加载完成'
        loadingProgress.value = 0
      }, 300)
    }, 1500)
  } catch (error) {
    clearInterval(progressInterval)
    throw error
  }
}

const handleIframeLoad = () => {
  isLoading.value = false
  hasError.value = false
  iframeStatus.value = '加载完成'
  loadingProgress.value = 0
}

const handleIframeError = () => {
  isLoading.value = false
  hasError.value = true
  iframeStatus.value = '加载失败'
  errorMessage.value = '页面加载失败，可能是网络问题或目标网站限制'
  loadingProgress.value = 0
}

const refreshPage = async () => {
  if (!currentPlatformInfo.value) return
  
  isRefreshing.value = true
  hasError.value = false
  
  try {
    if (iframeRef.value) {
      iframeRef.value.src = iframeRef.value.src || ''
    }
    await loadPlatform()
  } catch (error) {
    console.error('刷新失败:', error)
  } finally {
    isRefreshing.value = false
  }
}

const openInNewTab = () => {
  if (currentPlatformInfo.value) {
    window.open(currentPlatformInfo.value.url, '_blank')
  }
}

const selectFirstPlatform = () => {
  if (aiPlatforms.value.length > 0) {
    selectedPlatform.value = aiPlatforms.value[0]?.value || ''
    handlePlatformChange()
  }
}

// 自定义对话窗口相关方法
const sendMessage = async () => {
  if (!currentMessage.value.trim() || isAiTyping.value) return
  
  const userMessage: ChatMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: currentMessage.value.trim(),
    timestamp: new Date()
  }
  
  chatMessages.value.push(userMessage)
  const messageToSend = currentMessage.value.trim()
  currentMessage.value = ''
  
  // 模拟AI回复
  isAiTyping.value = true
  
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateAiResponse(messageToSend),
      timestamp: new Date()
    }
    
    chatMessages.value.push(aiMessage)
  } catch (error) {
    console.error('AI回复失败:', error)
    const errorMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '抱歉，我现在无法回复您的消息，请稍后再试。',
      timestamp: new Date()
    }
    chatMessages.value.push(errorMessage)
  } finally {
    isAiTyping.value = false
  }
}

const generateAiResponse = (userMessage: string): string => {
  // 简单的模拟AI回复逻辑
  const responses = [
    `我理解您提到的"${userMessage}"。这是一个很有趣的问题，让我为您详细解答。`,
    `关于"${userMessage}"，我可以为您提供以下信息和建议。`,
    `您好！针对您的问题"${userMessage}"，我认为可以从以下几个方面来考虑。`,
    `这是一个很好的问题。关于"${userMessage}"，我建议您可以尝试以下方法。`,
    `感谢您的提问。对于"${userMessage}"这个话题，我有一些想法想与您分享。`
  ]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  // 添加一些随机的详细内容
  const details = [
    '首先，我们需要考虑这个问题的背景和上下文。',
    '从技术角度来看，这涉及到多个方面的考量。',
    '根据我的知识库，这类问题通常有几种解决方案。',
    '让我为您分析一下可能的原因和解决方法。',
    '这确实是一个值得深入探讨的话题。'
  ]
  
  const randomDetail = details[Math.floor(Math.random() * details.length)]
  
  return `${randomResponse}\n\n${randomDetail}\n\n如果您需要更具体的帮助，请告诉我更多详细信息。`
}

const formatTime = (timestamp: Date): string => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  
  if (diff < 60000) { // 小于1分钟
    return '刚刚'
  } else if (diff < 3600000) { // 小于1小时
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) { // 小于1天
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    return timestamp.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// 监听器
watch(selectedPlatform, (newValue) => {
  if (newValue) {
    handlePlatformChange()
    
    // 切换到自定义平台时重置对话状态
    if (newValue === 'custom') {
      chatMessages.value = []
      currentMessage.value = ''
      isAiTyping.value = false
    }
  }
})

// 监听用户登录状态变化
watch(user, (newUser) => {
  // 如果用户登出且当前选择的是自定义平台，切换到默认平台
  if (!newUser && selectedPlatform.value === 'custom') {
    selectedPlatform.value = 'qwen'
  }
})

// 页面加载时检查登录状态
onMounted(() => {
  // 确保只在客户端执行
  if (import.meta.client) {
    // 如果URL参数中指定了自定义平台但用户未登录，重定向到登录页
    if (route.query.platform === 'custom' && !user.value) {
      navigateTo({
        path: '/login',
        query: {
          redirect: route.fullPath,
          platform: 'custom'
        }
      })
    }
  }
})
</script>