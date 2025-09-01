<template>
  <div class="chat-sender">
    <AXSender
v-model:value="inputValue" :placeholder="placeholder" :disabled="disabled" :loading="loading"
      :actions="false" @submit="handleSubmit" @keydown="handleKeydown"> <template
        #footer="{ info: { components: { SendButton, LoadingButton } } }">

        <AXSender.Header title="Upload Sample" :open="open" @open-change="openChange">
          <Flex vertical align="center" gap="small" :style="{ marginBlock: token.paddingLG }">
            <CloudUploadOutlined style="font-size: 4em" />
            <Typography.Title :level="5" style="margin: 0" content="Drag file here(just demo)" />
            <Typography.Text type="secondary" content="Support pdf, doc, xlsx, ppt, txt, image file types" />
            <Button @click="selectFileClick">
              Select File
            </Button>
          </Flex>
        </AXSender.Header>

        <Flex justify="space-between" align="center">
          <Flex gap="small" align="center">

            <Button type="text" @click="triggerOpen">
              <template #icon>
                <LinkOutlined />
              </template>
            </Button>

            <!-- <Button :style="iconStyle" type="text" :icon="h(LinkOutlined)" /> -->
            <Divider type="vertical" />
            <USelect
v-model="currentModel" :items="aiPlatforms" value-key="id" label-key="model" size="sm"
              class="w-36" />
            <!-- Deep Thinking -->
            <!-- <Switch size="small" /> -->
            <!-- <Divider type="vertical" /> -->
            <!-- <Button :icon="h(SearchOutlined)">
              Global Search
            </Button> -->
          </Flex>
          <Flex align="center">
            <!-- <Button type="text" :style="iconStyle" :icon="h(ApiOutlined)" /> -->
            <!-- <Divider type="vertical" />
            <component :is="SpeechButton" :style="iconStyle" /> -->
            <!-- <Divider type="vertical" /> -->
            <component :is="LoadingButton" v-if="loading" type="default" />
            <component :is="SendButton" v-else type="primary" :disabled="false" />
          </Flex>
        </Flex>
      </template>
    </AXSender>
    <p v-if="showHint" class="text-xs text-gray-500 mt-2">
      按 Enter 发送，Shift + Enter 换行
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LinkOutlined, CloudUploadOutlined } from '@ant-design/icons-vue';
import { Button, Divider, Flex, theme, Typography } from 'ant-design-vue';
import { Sender as AXSender } from 'ant-design-x-vue'
// 导入类型定义
import type { AiPlatformsList } from '~/utils/types'
// import type { SenderProps } from 'ant-design-x-vue'
// import 'ant-design-vue/dist/reset.css';
// 定义组件名称
defineOptions({
  name: 'ChatSender'
})

const currentModel = ref(1)
const open = ref(false);



const triggerOpen = () => {
  open.value = !open.value;
}
const openChange = (v: boolean) => {
  open.value = v;
}
const selectFileClick = () => {
 console.log('selectFileClick')
}

// 定义Props接口
interface ChatSenderProps {
  /** 输入框占位符文本 */
  placeholder?: string
  /** 是否禁用输入框 */
  disabled?: boolean
  /** 是否显示加载状态 */
  loading?: boolean
  /** 是否显示提示文本 */
  showHint?: boolean
  /** 输入框的值 */
  modelValue?: string
  /** AI 平台数据 */
  aiPlatforms?: AiPlatformsList[]
}

// 定义Emits接口
interface ChatSenderEmits {
  /** 更新输入框的值 */
  'update:modelValue': [value: string]
  /** 发送消息事件 */
  'send': [message: string]
  /** 键盘事件 */
  'keydown': [event: KeyboardEvent]
  /** 接收到普通内容 */
  'content': [content: string]
  /** 接收到思考内容 */
  'reasoning': [reasoning: string]
  /** AI 开始响应 */
  'ai-start': []
  /** AI 响应结束 */
  'ai-end': []
}

// 定义Props
const props = withDefaults(defineProps<ChatSenderProps>(), {
  placeholder: '输入您的问题...',
  disabled: false,
  loading: false,
  showHint: true,
  modelValue: '',
  aiPlatforms: () => []
})



// 当前选择的 AI 平台



// 定义Emits
const emit = defineEmits<ChatSenderEmits>()

// 内部输入值
const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  }
})
const { token } = theme.useToken();

// 发送 AI 请求到后端
const sendAIRequest = async (message: string) => {
  try {
    // 发射 AI 开始响应事件
    emit('ai-start')
    
    // 使用原生 fetch API 处理流式响应
    const response = await fetch('/api/ai-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message.trim(),
        platformId: currentModel.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 检查是否支持流式响应
    if (!response.body) {
      throw new Error('ReadableStream not supported')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''
    let fullReasoning = ''
    let buffer = '' // 用于处理不完整的 JSON 行

    try {
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          break
        }

        // 解码数据块
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk
        
        // 按行分割处理 JSON 数据
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // 保留最后一个可能不完整的行
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line)
              const { type, data } = parsed
              
              if (type === 'content') {
                fullResponse += data
                // 发射普通内容事件给父组件
                emit('content', data)
              } else if (type === 'reasoning') {
                fullReasoning += data
                // 发射思考内容事件给父组件
                emit('reasoning', data)
              }
            } catch (parseError) {
              console.warn('解析 JSON 失败:', line, parseError)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
    
    console.log('AI 请求成功，普通内容:', fullResponse)
    console.log('AI 请求成功，思考内容:', fullReasoning)
    
    // 发射 AI 响应结束事件
    emit('ai-end')
    

  } catch (error) {
    console.error('发送 AI 请求失败:', error)
    
    // 发射 AI 响应结束事件（即使出错也要结束）
    emit('ai-end')
    
    // 发生异常时也要发送消息事件
    emit('send', message.trim())
  }
}

// 处理发送消息
const handleSubmit = (message: string) => {
  if (message.trim() && !props.disabled && !props.loading) {
    // 发送消息事件让父组件处理响应
    emit('send', message.trim())
    // 使用 XRequest 发送 AI 请求
    sendAIRequest(message.trim())

    // 清空输入框
    inputValue.value = ''
  }
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  
  // Enter键发送消息（不包含Shift）
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit(inputValue.value)
  }
  // Shift + Enter 换行（默认行为，不需要特殊处理）
}

// 暴露组件方法
defineExpose({
  /** 清空输入框 */
  clear: () => {
    inputValue.value = ''
  },
  /** 聚焦输入框 */
  focus: () => {
    // 这里可以添加聚焦逻辑，如果Sender组件支持的话
  },
  /** 获取当前输入值 */
  getValue: () => inputValue.value
})
</script>

<style scoped>

.chat-sender {
  width: 100%;
}

.chat-sender :deep(.ant-input) {
  resize: none;
}

.chat-sender :deep(.ant-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>