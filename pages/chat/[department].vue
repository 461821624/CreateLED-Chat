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
        <!-- 会话管理侧边栏 -->
        <aside
v-if="selectedPlatform === 'custom'"
          class="w-80 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 transition-all duration-300">
          <ConversationManager
@conversation-change="handleConversationChange"
            @conversation-create="handleConversationCreate" @conversation-rename="handleConversationRename"
            @conversation-delete="handleConversationDelete" />
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
v-show="proxyUrl && !isLoading && !hasError && selectedPlatform !== 'custom'" ref="iframeRef"
                :src="proxyUrl" class="w-full h-full border-0"
                :title="selectedPlatform ? `${selectedPlatform} 平台页面` : 'AI平台页面'"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads"
                @load="handleIframeLoad" @error="handleIframeError" />

              <!-- 自定义对话窗口 - 仅在选择自定义平台时显示 -->
              <div
v-if="selectedPlatform === 'custom' && !isLoading && !hasError"
                class="h-full flex flex-col bg-white rounded-lg">
                <!-- 对话消息列表 -->
                <div class="flex-1 min-h-0 relative">
                  <ChatWelcome v-if="chatMessages.length === 0" class="absolute inset-0" :icon="renderIcon" />

                  <div class="absolute inset-0 p-4">
                    <ChatBubble 
                      :messages="chatMessages" 
                      @on-message-click="handleMessageClick" 
                    />
                  </div>
                </div>

                <!-- 输入区域 -->
                <div class="flex-shrink-0 border-t border-gray-200 p-4">
                  <ChatSender
v-model="currentMessage" placeholder="输入您的问题..." :disabled="isAiTyping"
                    :loading="isAiTyping" :show-hint="true" :ai-platforms="aiPlatformsData || []" 
                    @send="handleSendMessage" 
                    @content="handleContentReceived" 
                    @reasoning="handleReasoningReceived" 
                    @ai-start="handleAiStart" 
                    @ai-end="handleAiEnd" />
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
import type { Platform, AiPlatformsList } from '../../utils/types'
import type { DropdownMenuItem } from '@nuxt/ui'
import ChatSender from '../../components/ChatSender.vue'
import ChatBubble from '../../components/ChatBubble.vue'
import ChatWelcome from '../../components/ChatWelcome.vue'
import type { ChatMessage } from '../../components/ChatBubble.vue'

// 定义组件名称以符合ESLint规范
defineOptions({
  name: 'DepartmentChat'
})

// 路由参数和用户状态
const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const aiPlatformsData = ref<AiPlatformsList[]>([])
// 获取 AI 平台数据 - 通过后端 API
const aiPlatformsResponse = await $fetch('/api/ai-platforms').catch(err => ({ data: null, error: err }))
aiPlatformsData.value = aiPlatformsResponse?.data || []

console.log('AI平台数据:', aiPlatformsData.value)

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



const currentMessage = ref('')
const isAiTyping = ref(false)
// 状态管理
const connectionStatus = ref('已连接')
const iframeStatus = ref('等待加载')
const chatMessages = ref<ChatMessage[]>([]);
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
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      onSelect: () => handleLogout()
    }
  ]
]


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

// 消息点击处理函数
const handleMessageClick = (event: MouseEvent, message?: ChatMessage) => {
  console.log('消息被点击:', message)
  // 可以在这里添加消息点击的逻辑，比如复制消息内容等
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
  return ``
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
const renderIcon = () => {
  return h('i-simple-icons-baidu', { class: 'w-8 h-8' })
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

// 会话管理相关方法
const handleConversationChange = (conversationId: string) => {
  console.log('选择会话:', conversationId)
  // 这里可以加载选中会话的历史消息
  // 暂时清空当前消息，模拟切换会话
  chatMessages.value = []
  currentMessage.value = ''
  isAiTyping.value = false
}

const handleConversationCreate = (title: string) => {
  console.log('创建新会话:', title)
  // 清空当前对话
  chatMessages.value = []
  currentMessage.value = ''
  isAiTyping.value = false
}

const handleConversationRename = (conversationId: string, newTitle: string) => {
  console.log('重命名会话:', conversationId, newTitle)
  // 这里可以调用API更新会话标题
}

const handleConversationDelete = (conversationId: string) => {
  console.log('删除会话:', conversationId)
  // 这里可以调用API删除会话
  // 如果删除的是当前会话，清空消息
  chatMessages.value = []
  currentMessage.value = ''
  isAiTyping.value = false
}

// 自定义对话窗口相关方法
let currentAiMessage: ChatMessage | null = null

// ChatSender组件的发送事件处理
const handleSendMessage = async (message: string) => {
  if (!message.trim() || isAiTyping.value) return
  
  const userMessage = {
    key: Date.now().toString(),
    id: Date.now().toString(),
    role: "user" as const,
    content: message.trim(),
    timestamp: new Date(),
    avatar: user.value?.user_metadata.avatar_url,
  }
  
  chatMessages.value.push(userMessage)
  currentMessage.value = ''
}

// AI 开始响应事件处理
const handleAiStart = () => {
  isAiTyping.value = true
  
  // 创建新的 AI 消息对象
  currentAiMessage = {
    key: Date.now().toString(),
    role: 'assistant' as const,
    content: '',
    reasoning: '',
    timestamp: new Date()
  }
  
  chatMessages.value.push(currentAiMessage)
}

// AI 响应结束事件处理
const handleAiEnd = () => {
  isAiTyping.value = false
  currentAiMessage = null
}

// 接收普通内容事件处理
const handleContentReceived = (content: string) => {
  if (currentAiMessage) {
    currentAiMessage.content += content
    // 触发响应式更新
    chatMessages.value = [...chatMessages.value]
  }
}

// 接收思考内容事件处理
const handleReasoningReceived = (reasoning: string) => {
  if (currentAiMessage) {
    if (!currentAiMessage.reasoning) {
      currentAiMessage.reasoning = ''
    }
    currentAiMessage.reasoning += reasoning
    // 触发响应式更新
    chatMessages.value = [...chatMessages.value]
  }
}





// 监听器
watch(selectedPlatform, (newValue) => {
  if (newValue) {
    handlePlatformChange()
    
    // 切换到自定义平台时重置对话状态
    if (newValue === 'custom') {
      chatMessages.value = [
      ]
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