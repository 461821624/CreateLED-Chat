<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow-sm rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
        
        <div class="prose prose-gray max-w-none">
          <h2>1. 信息收集</h2>
          <p>我们仅收集必要的用户信息，包括邮箱地址用于账户验证和服务提供。</p>
          
          <h2>2. 信息使用</h2>
          <p>收集的信息仅用于：</p>
          <ul>
            <li>提供和改进我们的服务</li>
            <li>用户身份验证</li>
            <li>发送重要的服务通知</li>
          </ul>
          
          <h2>3. 信息保护</h2>
          <p>我们采用行业标准的安全措施来保护用户信息，包括数据加密和安全传输。</p>
          
          <h2>4. 信息共享</h2>
          <p>我们不会向第三方出售、交易或转让用户的个人信息，除非获得用户明确同意。</p>
          
          <h2>5. Cookie使用</h2>
          <p>我们使用Cookie来改善用户体验，用户可以通过浏览器设置管理Cookie。</p>
          
          <h2>6. 政策更新</h2>
          <p>我们可能会不时更新本隐私政策，更新后的政策将在本页面发布。</p>
          
          <h2>7. 联系我们</h2>
          <p>如果您对本隐私政策有任何疑问，请通过邮箱联系我们。</p>
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
  title: '隐私政策'
})
</script>