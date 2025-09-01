<template>
  <AXWelcome
    :title="title"
    :description="description"
    :variant="variant"
    :icon="icon"
    :extra="extra"
    :class-names="classNames"
    :styles="styles"
    @click="handleClick"
  >
    <!-- 自定义标题插槽 -->
    <template v-if="$slots.title" #title>
      <slot name="title" :title="title" />
    </template>
    
    <!-- 自定义描述插槽 -->
    <template v-if="$slots.description" #description>
      <slot name="description" :description="description" />
    </template>
    
    <!-- 自定义图标插槽 -->
    <template v-if="$slots.icon" #icon>
      <slot name="icon" :icon="icon" />
    </template>
    
    <!-- 自定义额外内容插槽 -->
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    
    <!-- 自定义操作按钮插槽 -->
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </AXWelcome>
</template>

<script setup lang="ts">
import type { WelcomeProps } from 'ant-design-x-vue';
import { computed, type VNode } from 'vue';

// 定义变体类型
export type WelcomeVariant = 'filled' | 'outlined' | 'borderless';

// 定义欢迎配置类型
export interface WelcomeConfig {
  title: string;
  description?: string;
  icon?: string | VNode;
  variant?: WelcomeVariant;
  actions?: WelcomeAction[];
  extra?: string | number | boolean | object | unknown;
}

// 定义操作按钮类型
export interface WelcomeAction {
  key: string;
  label: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  icon?: string | VNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}


// 定义事件
export interface ChatWelcomeEmits {
  /** 点击欢迎区域事件 */
  click: [event: MouseEvent];
  /** 操作按钮点击事件 */
  actionClick: [action: WelcomeAction, event: MouseEvent];
  /** 图标点击事件 */
  iconClick: [event: MouseEvent];
}

// 组件属性定义
const props = withDefaults(defineProps<WelcomeProps>(), {
  title: '欢迎使用 AI 助手',
  description: '我是您的智能助手，有什么可以帮助您的吗？',
  variant: 'filled',
  showDefaultIcon: true,
  centered: true,
  actions: () => []
});

// 组件事件定义
const emit = defineEmits<ChatWelcomeEmits>();

// 计算属性：处理标题
const title = computed(() => {
  if (props?.title) {
    return props.title;
  }
  return props.title;
});

// 计算属性：处理描述
const description = computed(() => {
  if (props?.description) {
    return props.description;
  }
  return props.description;
});

// 计算属性：处理图标
const icon = computed(() => {
  if (props?.icon) {
    return props.icon;
  }
  if (props.icon) {
    return props.icon;
  }
  return null;
});

// 计算属性：处理变体
const variant = computed(() => {
  if (props?.variant) {
    return props.variant;
  }
  return props.variant;
});

// 计算属性：处理额外内容
const extra = computed(() => {
  if (props?.extra) {
    return props.extra;
  }
  return props.extra;
});


// 计算属性：处理样式类

// 事件处理：点击欢迎区域
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

// 事件处理：操作按钮点击

// 事件处理：图标点击

// 暴露组件方法
defineExpose({
  /** 获取标题 */
  getTitle: () => title.value,
  /** 获取描述 */
  getDescription: () => description.value,
});
</script>

<style scoped lang="less">
/* 欢迎组件基础样式 */
.chat-welcome {
  padding: 24px;
  text-align: center;
}

/* 居中显示样式 */
.chat-welcome--centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

/* 标题样式 */
.chat-welcome__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #262626;
}

/* 描述样式 */
.chat-welcome__description {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 24px;
  line-height: 1.5;
}

/* 图标样式 */
.chat-welcome__icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #1890ff;
}

/* 操作按钮容器样式 */
.chat-welcome__actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 额外内容样式 */
.chat-welcome__extra {
  margin-top: 16px;
}

/* 变体样式 */
.chat-welcome--filled {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.chat-welcome--outlined {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
}

</style>