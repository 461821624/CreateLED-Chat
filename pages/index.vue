<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- 页面头部 -->
    <header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6 text-white" />
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CreateLED Chat 智能对话平台</h1>
          </div>
          <div class="flex items-center space-x-4">
            <UBadge color="primary" variant="subtle" class="animate-pulse">组织架构</UBadge>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题和描述 -->
      <div class="text-center mb-16 animate-fade-in">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
          <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-white" />
        </div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
          选择部门开始对话</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">点击下方部门卡片，进入AI智能对话界面，体验前沿的人工智能技术</p>
        <div class="mt-8 flex justify-center">
          <div class="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span class="text-sm text-gray-700 font-medium">AI平台在线服务</span>
          </div>
        </div>
      </div>

      <!-- 组织架构网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- 总裁部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-red-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('president')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-star" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">总裁部门
                </h3>
                <p class="text-xs text-gray-500 font-medium">President Office</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责企业战略规划、重大决策和整体运营管理</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">战略规划</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">决策管理</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入总裁部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 销售部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('sales')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  销售部门</h3>
                <p class="text-xs text-gray-500 font-medium">Sales Department</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责产品销售、客户开发和销售业绩管理</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">客户开发</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">销售管理</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入销售部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 市场部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('marketing')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-megaphone" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  市场部门</h3>
                <p class="text-xs text-gray-500 font-medium">Marketing Department</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责市场推广、品牌建设和市场分析</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">品牌推广</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">市场分析</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入市场部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 品质中心 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('quality')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  品质中心</h3>
                <p class="text-xs text-gray-500 font-medium">Quality Center</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责质量管理、质量控制和质量体系建设</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">质量控制</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">体系建设</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入品质中心对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 供应链部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('supply-chain')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-truck" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  供应链部门</h3>
                <p class="text-xs text-gray-500 font-medium">Supply Chain</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责采购管理、供应商管理和物流协调</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">采购管理</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">物流协调</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入供应链部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 研发部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('rd')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                  研发部门</h3>
                <p class="text-xs text-gray-500 font-medium">R&D Department</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责产品研发、技术创新和技术支持</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">产品研发</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">技术创新</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入研发部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 财务部门 -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('finance')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  财务部门</h3>
                <p class="text-xs text-gray-500 font-medium">Finance Department</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责财务管理、成本控制和财务分析</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">财务管理</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">成本控制</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入财务部门对话
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- 生产部门（成都） -->
        <UCard
          class="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50/50 border-0 shadow-lg backdrop-blur-sm"
          @click="navigateToDepartment('production-chengdu')">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  生产部门</h3>
                <p class="text-xs text-gray-500 font-medium">Production (Chengdu)</p>
              </div>
            </div>
          </template>
          <div class="space-y-3">
            <p class="text-gray-600 leading-relaxed text-sm">负责生产计划、生产管理和设备维护</p>
            <div class="flex flex-wrap gap-1">
              <UBadge variant="soft" class="px-2 py-1 text-xs">生产管理</UBadge>
              <UBadge variant="soft" class="px-2 py-1 text-xs">设备维护</UBadge>
            </div>
            <div class="pt-2">
              <UButton
variant="solid" size="sm" block
                class="group-hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
                进入生产部门对话
              </UButton>
            </div>
          </div>
        </UCard>


      </div>

      <!-- 底部信息 -->
      <div class="mt-16 text-center">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">平台特色</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-blue-500" />
              <div class="text-left">
                <h4 class="font-medium text-gray-900">多AI平台集成</h4>
                <p class="text-sm text-gray-600">支持主流AI对话平台</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-green-500" />
              <div class="text-left">
                <h4 class="font-medium text-gray-900">安全可靠</h4>
                <p class="text-sm text-gray-600">企业级安全保障</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-purple-500" />
              <div class="text-left">
                <h4 class="font-medium text-gray-900">高效便捷</h4>
                <p class="text-sm text-gray-600">一站式智能对话体验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="mt-20 py-12 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-100">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center space-x-2 mb-4">
          <div
            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CreateLED Chat
          </span>
        </div>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          基于人工智能技术的企业级智能对话平台，为不同部门提供专业的AI助手服务
        </p>
        <div class="flex items-center justify-center space-x-6 mb-6">
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4" />
            <span>安全可靠</span>
          </div>
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <UIcon name="i-heroicons-bolt" class="w-4 h-4" />
            <span>高效智能</span>
          </div>
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <UIcon name="i-heroicons-heart" class="w-4 h-4" />
            <span>用户友好</span>
          </div>
        </div>
        <div class="text-sm text-gray-400">
          © 2024 CreateLED. All rights reserved. Powered by AI Technology.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from 'nuxt/app';

// 定义组件名称以符合ESLint规范
defineOptions({
  name: 'HomePage'
});

// 页面元数据设置
useHead({
  title: 'CreateLED Chat 智能对话平台 - 组织架构',
  meta: [
    { name: 'description', content: '企业智能对话平台，支持多部门AI对话服务' }
  ]
})

/**
 * 导航到指定部门的对话页面
 * @param department 部门标识
 */
const navigateToDepartment = (department: string) => {
  navigateTo(`/chat/${department}`)
}
</script>

<style scoped>
/* 自定义样式 */
.transform {
  transition: transform 0.2s ease-in-out;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>