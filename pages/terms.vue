<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow-sm rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">服务条款</h1>
        
        <div class="prose prose-gray max-w-none">
          <h2>1. 服务说明</h2>
          <p>本平台提供AI聊天服务，用户可以通过本平台与多种AI助手进行对话。</p>
          
          <h2>2. 用户责任</h2>
          <p>用户在使用本服务时，应当遵守相关法律法规，不得发布违法、有害信息。</p>
          
          <h2>3. 隐私保护</h2>
          <p>我们重视用户隐私，详细的隐私政策请参见隐私政策页面。</p>
          
          <h2>4. 服务变更</h2>
          <p>我们保留随时修改或终止服务的权利，恕不另行通知。</p>
          
          <h2>5. 免责声明</h2>
          <p>本平台不对AI生成的内容承担责任，用户应当理性使用AI服务。</p>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-200">
          <UButton 
            to="/login" 
            variant="outline" 
            icon="i-heroicons-arrow-left"
          >
            返回登录
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '服务条款'
})
</script>