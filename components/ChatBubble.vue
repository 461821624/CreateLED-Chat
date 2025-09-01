<script setup lang="ts">
/**
 * ChatBubble 组件 - 聊天气泡组件
 * 
 * 功能特性：
 * - 支持 Markdown 渲染和代码高亮
 * - 支持思考过程的展示和折叠
 * - 自动滚动到最新消息
 * - 响应式设计和性能优化
 * 
 * @author SOLO Coding
 * @version 2.0.0
 */

// Vue 相关导入
import { h, ref, nextTick, watch, defineProps, defineEmits, computed } from 'vue';

// Ant Design 组件导入
import { Bubble, type BubbleProps } from 'ant-design-x-vue';
import { BulbOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { Flex, Avatar, Button, Space } from 'ant-design-vue';

// Markdown 相关导入
import markdownit from 'markdown-it';
import hljs from 'highlight.js'; // 代码高亮库
import 'highlight.js/styles/github.css';

// ==================== Markdown 配置 ====================

/**
 * Markdown 渲染器配置
 * 支持代码高亮和 HTML 渲染
 */
const md = markdownit({
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (error) {
        console.error('代码高亮失败:', error);
      }
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  },
  html: true,    // 允许 HTML 标签
  breaks: true   // 自动换行
});

/**
 * Markdown 渲染函数
 * 将 Markdown 文本转换为 Vue 虚拟节点
 */
const renderMarkdown: BubbleProps['messageRender'] = (content) => {
  return h('div', { innerHTML: md.render(content) });
};

// ==================== 状态管理 ====================

/**
 * 思考内容折叠状态管理
 * 使用消息的 key 作为索引，默认为折叠状态
 */
const collapseStates = ref<Record<string | number, boolean>>({});

/**
 * 切换指定消息的折叠状态
 * @param messageKey 消息的唯一标识
 */
const toggleCollapse = (messageKey: string | number): void => {
  collapseStates.value[messageKey] = !collapseStates.value[messageKey];
};

/**
 * 获取指定消息的折叠状态
 * @param messageKey 消息的唯一标识
 * @returns 是否折叠（默认为 true）
 */
const isCollapsed = (messageKey: string | number): boolean => {
  return collapseStates.value[messageKey] ?? true;
};

// ==================== 计算属性 ====================


/**
 * 获取最后一条消息
 * 用于监听最新消息变化
 */
const lastMessage = computed(() => {
  return props.messages[props.messages.length - 1];
});


// 消息角色类型
type MessageRole = 'user' | 'assistant' | 'ai' | 'system';

// 消息状态类型
interface MessageStatus {
  typing?: boolean;   // 是否显示打字机效果
  loading?: boolean;  // 是否显示加载中状态
}

// 消息元数据类型
interface MessageMetadata {
  timestamp?: Date | string;  // 时间戳
  avatar?: string;           // 自定义头像
  metadata?: Record<string, unknown> | null; // 额外元数据
}

// 聊天消息接口
export interface ChatMessage extends MessageStatus, MessageMetadata {
  key: string | number;    // 唯一标识
  role: MessageRole;       // 消息角色
  content: string;         // 消息内容
  reasoning?: string;      // 思考内容
}

// 组件 Props 类型
interface ChatBubbleProps {
  messages: ChatMessage[];
  autoScroll?: boolean;
  maxHeight?: string;
  onMessageClick?: (message: ChatMessage, index: number) => void;
}

// 组件 Emits 类型
interface ChatBubbleEmits {
  'on-message-click': [event: MouseEvent, message: ChatMessage];
}

const props = withDefaults(defineProps<ChatBubbleProps>(), {
  autoScroll: true,
});

const emit = defineEmits<ChatBubbleEmits>();

// ==================== 组件引用 ====================

/**
 * 聊天容器的 DOM 引用
 * 用于实现自动滚动功能
 */
const containerRef = ref<HTMLElement>();

// ==================== 事件处理 ====================

/**
 * 处理消息点击事件
 * 同时触发组件的 emit 事件和 props 回调
 * 
 * @param event 鼠标点击事件
 * @param message 被点击的消息对象
 * @param index 消息在列表中的索引
 */
const handleMessageClick = (event: MouseEvent, message: ChatMessage, index: number): void => {
  emit('on-message-click', event, message);
  props.onMessageClick?.(message, index);
};

// ==================== 工具函数 ====================

/**
 * 根据消息角色获取气泡位置
 * 
 * @param role 消息角色
 * @returns 气泡位置（'start' | 'end'）
 */
const getPlacement = (role: MessageRole): 'start' | 'end' => {
  switch (role) {
    case 'user':
      return 'end';  // 用户消息显示在右侧
    case 'system':
    case 'assistant':
    case 'ai':
    default:
      return 'start'; // AI/系统消息显示在左侧
  }
};

/**
 * 自动滚动到聊天容器底部
 * 使用平滑滚动效果
 */
const scrollToBottom = (): void => {
  nextTick(() => {
    if (containerRef.value) {
      const container = containerRef.value;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

// ==================== 监听器 ====================

/**
 * 监听消息变化，实现智能自动滚动
 * 只在以下情况触发滚动：
 * 1. 消息数量增加（新消息）
 * 2. 最后一条消息的内容或思考过程发生变化
 */
watch(
  [() => props.messages.length, lastMessage], 
  ([newLength, newLastMessage], [oldLength, oldLastMessage]) => {
    if (props.autoScroll) {
      // 消息数量增加时滚动
      if (newLength > (oldLength || 0)) {
        scrollToBottom();
      }
      // 最后一条消息内容或推理内容变化时滚动
      else if (newLastMessage && oldLastMessage && 
               (newLastMessage.content !== oldLastMessage.content ||
                newLastMessage.reasoning !== oldLastMessage.reasoning)) {
        scrollToBottom();
      }
    }
  }, 
  { immediate: true }
)

// ==================== 组件暴露 ====================

/**
 * 暴露给父组件的方法
 * 允许父组件手动触发滚动
 */
defineExpose({
  scrollToBottom
});

// ==================== 组件导出 ====================
</script>

<template>
  <div
ref="containerRef" class="chat-bubble-container">
    <Flex vertical gap="middle">
      <template v-for="(message, index) in props.messages" :key="message.key">


        <!-- 普通内容气泡 -->
        <Bubble
:placement="getPlacement(message.role)" :content="renderMarkdown(message.content)"
          :typing="message.typing" :loading="message.loading"
          @click="(event: MouseEvent) => handleMessageClick(event, message, index)">
          <template #avatar>
            <Avatar v-if="message.role === 'user'" :src="message.avatar" :style="{ width: 24, height: 24 }" />
            <Avatar
v-else src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              :style="{ width: 24, height: 24 }" />
          </template>
          <template v-if="message.reasoning" #message>
            <Space>
              <BulbOutlined style="color: #faad14;" />
              <span style="color: #666; font-size: 12px;">{{ isCollapsed(message.key) ? '展开思考过程' : '收起思考过程' }}</span>
              <Button
type="text" size="small" style="background: transparent;"
                :icon="isCollapsed(message.key) ? h(DownOutlined) : h(UpOutlined)"
                @click="() => toggleCollapse(message.key)" />
            </Space>
          </template>
          <template v-if="message.reasoning" #footer>
            <Space direction="vertical" style="width: 100%;">
              <!-- 思考过程 -->

          
              <Bubble
v-show="!isCollapsed(message.key)" variant="borderless" :typing="message.typing"
                :content="message.reasoning" :message-render="renderMarkdown" class="reasoning-bubble" />


              <!-- 最终回答 -->


              <Bubble
variant="borderless" :typing="message.typing" :content="message.content"
                :message-render="renderMarkdown" class="answer-bubble" />

            </Space>
          </template>
        </Bubble>
      </template>
    </Flex>
  </div>
</template>

<style scoped>
.chat-bubble-container {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

/* ==================== 思考过程样式 ==================== */




.reasoning-bubble :deep(.ant-bubble-content) {
  background: linear-gradient(135deg, #fef7f0 0%, #fff2e8 100%);
  border: 1px solid #ffe7ba;
  border-radius: 8px;
  font-style: italic;
  color: #8b5a2b;
  padding: 12px;
}

/* ==================== 回答内容样式 ==================== */


.answer-header {
  font-weight: 600;
  color: #262626;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}



/* ==================== 按钮样式优化 ==================== */

.ant-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}



.ant-btn:active {
  transform: translateY(0);
}

/* ==================== 图标样式 ==================== */

.anticon {
  transition: all 0.3s ease;
}


/* ==================== 动画效果 ==================== */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.answer-section {
  animation: fadeIn 0.4s ease-out;
}

/* ==================== 兼容性样式 ==================== */

/* 保持旧样式兼容性 */
.reasoning-bubble {
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  border: 1px solid #d0e7ff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.reasoning-bubble:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

/* ==================== 滚动条样式 ==================== */

:deep(.ant-bubble-content) {
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
}

:deep(.ant-bubble-content::-webkit-scrollbar) {
  width: 6px;
}

:deep(.ant-bubble-content::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.ant-bubble-content::-webkit-scrollbar-thumb) {
  background-color: #d9d9d9;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

:deep(.ant-bubble-content::-webkit-scrollbar-thumb:hover) {
  background-color: #bfbfbf;
}

/* ==================== 代码块样式优化 ==================== */

:deep(.hljs) {
  border-radius: 8px;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(pre) {
  margin: 8px 0;
  overflow-x: auto;
}

:deep(code) {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
}



/* ==================== 加载状态样式 ==================== */

:deep(.ant-spin) {
  color: #1890ff;
}

:deep(.ant-spin-dot) {
  font-size: 16px;
}


/* ==================== 打印样式 ==================== */

@media print {
  .answer-section {
    box-shadow: none;
    border: 1px solid #d9d9d9;
  }
  
  .ant-btn {
    display: none;
  }
}
</style>
