
<template>
  <div class="conversation-manager h-full flex flex-col">
    <!-- 头部 -->
    <div class="flex items-center justify-between mb-6 p-6 pb-0">
      <h3 class="text-lg font-semibold text-gray-800">会话管理</h3>
      <UButton size="sm" variant="soft" icon="i-heroicons-plus" @click="createNewConversation">
        新建
      </UButton>
    </div>

    <!-- 会话列表 -->
    <div class="flex-1 overflow-hidden px-6">
      <div class="conversation-list">
        <AXConversations
v-model:active-key="activeConversationId" :items="conversations" :menu="conversationMenu"
          :on-active-change="handleConversationChange" class="custom-conversations" />
      </div>

      <!-- 空状态 -->
      <div v-if="conversations.length === 0" class="text-center py-8">
        <div
          class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-white" />
        </div>
        <h4 class="text-sm font-medium text-gray-800 mb-2">暂无会话</h4>
        <p class="text-xs text-gray-500 mb-4">点击上方按钮创建新会话</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ConversationsProps, Conversation } from 'ant-design-x-vue'
import { ref, h } from 'vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
const [messageApi] = message.useMessage();
const emit = defineEmits<{
  'conversation-change': [conversationId: string]
  'conversation-create': [title: string]
  'conversation-delete': [conversationId: string]
  'conversation-rename': [conversationId: string, newName: string]
}>()

// 当前激活的会话ID
const activeConversationId = ref<string>('')

// 会话列表
const conversations = ref<Conversation[]>([
  {
    key: '1',
    label: '默认会话',
    timestamp: Date.now(),
    group: 'recent'
  },
  {
    key: '2', 
    label: 'AI助手咨询',
    timestamp: Date.now() - 3600000,
    group: 'recent'
  }
])

// 会话菜单配置
const conversationMenu: ConversationsProps['menu'] = (conversation) => ({
  items: [
    {
      key: 'rename',
      label: '重命名',
      icon: h(EditOutlined)
    },
    {
      key: 'delete',
      label: '删除',
      icon: h(DeleteOutlined),
      danger: true
    }
  ],
  onClick: (menuInfo) => {
    messageApi.info(`Click ${conversation.key} - ${menuInfo.key}`);
  }
})

// 处理会话切换
const handleConversationChange = (conversationId: string) => {
  activeConversationId.value = conversationId
  emit('conversation-change', conversationId)
}

// 创建新会话
const createNewConversation = () => {
  const newConversation: Conversation = {
    key: `conv_${Date.now()}`,
    label: `新会话 ${conversations.value.length + 1}`,
    timestamp: Date.now(),
    group: 'recent'
  }
  
  conversations.value.unshift(newConversation)
  activeConversationId.value = newConversation.key
  
  // 确保label是string类型
  const title = typeof newConversation.label === 'string' ? newConversation.label : `新会话 ${conversations.value.length}`
  emit('conversation-create', title)
  emit('conversation-change', newConversation.key)
}

// 重命名会话
// 删除会话

// 暴露方法给父组件
defineExpose({
  createNewConversation,
  activeConversationId: readonly(activeConversationId),
  conversations: readonly(conversations)
})
</script>

<style scoped>
.conversation-manager {
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
}

.conversation-list {
  max-height: 60vh;
  overflow-y: auto;
}

</style>