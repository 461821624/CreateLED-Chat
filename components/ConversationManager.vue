
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
        <contextHolder />
        <ClientOnly>
          <AXConversations
:active-key="activeConversationId" :default-active-key="defaultActiveKey"
            :items="sortedConversations" :menu="conversationMenu" :groupable="groupable"
            :on-active-change="handleConversationChange" class="custom-conversations" />
        </ClientOnly>
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
import { ref, h, computed, readonly, watch } from 'vue'
import {ClockCircleOutlined, CalendarOutlined, HistoryOutlined } from '@ant-design/icons-vue'
import { Space, message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage();


const emit = defineEmits<{
  'conversation-change': [conversationId: string]
  'conversation-create': [title: string]
  'conversation-delete': [conversationId: string]
  'conversation-rename': [conversationId: string, newName: string]

}>()
const props = defineProps<{
  conversations: Conversation[]
}>()
// 当前激活的会话ID
const activeConversationId = ref<string>('')
const defaultActiveKey = ref<string>('')


// 按时间倒序排列的会话列表
const sortedConversations = computed(() => {
  return [...props.conversations].sort((a, b) => {
    const timestampA = a.timestamp || 0
    const timestampB = b.timestamp || 0
    return timestampB - timestampA // 倒序排列
  })
})

watch(() => props.conversations, (newConversations) => {
  if (newConversations.length > 0) {
    defaultActiveKey.value = newConversations[0]?.key ?? ''
    activeConversationId.value = newConversations[0]?.key ?? ''
  }
})
// 分组标题映射
const groupTitleMap = {
  today: '今天',
  yesterday: '昨天', 
  thisWeek: '本周',
  earlier: '更早'
}

// 分组图标映射
const groupIconMap = {
  today: ClockCircleOutlined,
  yesterday: CalendarOutlined,
  thisWeek: CalendarOutlined,
  earlier: HistoryOutlined
}

// 分组排序优先级
const groupOrder = {
  today: 1,
  yesterday: 2,
  thisWeek: 3,
  earlier: 4
}

// 会话分组配置
const groupable: ConversationsProps['groupable'] = {
  sort(a, b) {
    if (a === b) return 0
    
    // 按分组优先级排序
    const orderA = groupOrder[a as keyof typeof groupOrder] || 999
    const orderB = groupOrder[b as keyof typeof groupOrder] || 999
    
    return orderA - orderB
  },
  title: (group, { components: { GroupTitle } }) => {
    if (!group) return h(GroupTitle)
    
    const title = groupTitleMap[group as keyof typeof groupTitleMap] || group
    const IconComponent = groupIconMap[group as keyof typeof groupIconMap] || ClockCircleOutlined
    
    return h(
      GroupTitle,
      null,
      () => [
        h(Space, { size: 'small' }, () => [
          h(IconComponent, { style: { color: '#1890ff' } }),
          h('span', { style: { fontWeight: '500' } }, title)
        ])
      ]
    )
  }
}
const withIconLabel = (IconComp: any, text: string) =>
  () =>
    h('span', { class: 'ax-menu-item', style: { display: 'inline-flex', alignItems: 'center', gap: '8px' } }, [
      h(IconComp, { style: { fontSize: '14px' } }),
      h('span', null, text)
    ])

// 会话菜单配置
const conversationMenu: ConversationsProps['menu'] = (conversation) => ({
  items: [
    {
      key: 'rename',
      // ❌ 不要再用 icon: ...
      label: '重命名',
    },
    {
      key: 'delete',
      danger: true,
      label: '删除',
    }
  ] as MenuProps['items'],
  onClick: (menuInfo) => {
    // if (menuInfo.key === 'delete') {
    //   messageApi.confirm({
    //     title: '确认删除吗？',
    //     content: '删除后将无法恢复',
    //     okText: '确认',
    //     okType: 'danger',
    //     onOk: () => {
    //       emit('conversation-delete', conversation.key)
    //     }
    //   })
    // } else {
      messageApi.info(`Click ${conversation.key} - ${menuInfo.key}`)
    // }
  }
})

// 处理会话切换
const handleConversationChange = (conversationId: string) => {
  activeConversationId.value = conversationId
  emit('conversation-change', conversationId)
}

// 创建新会话
const createNewConversation = () => {
  const timestamp = Date.now()
  const newConversation: Conversation = {
    key: `conv_${timestamp}`,
    label: `新会话 ${props.conversations.length + 1}`,
    timestamp,
    group: getTimeGroup(timestamp)
  }
  
  // emit('conversation-create', newConversation.label, `新会话 ${props.conversations.length}`)
  activeConversationId.value = newConversation.key
  
  // // 确保label是string类型
  // const title = typeof newConversation.label === 'string' ? newConversation.label : `新会话 ${props.conversations.length}`
  // emit('conversation-create', title)
  // emit('conversation-change', newConversation.key)
}

// 重命名会话
// 删除会话

// 暴露方法给父组件
defineExpose({
  createNewConversation,
  activeConversationId: readonly(activeConversationId),
  conversations: readonly(sortedConversations)
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