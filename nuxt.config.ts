// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 3288,
    host: "0.0.0.0",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/supabase",
  ],
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  // Netlify 部署配置
  nitro: {
    preset: "netlify",
    // 预渲染路由配置
    prerender: {
      routes: ["/"],
    },
  },
  // 启用服务端渲染
  ssr: true,
  supabase: {
    // redirect: false
    redirectOptions: {
      login: "/login",
      callback: "/callback",
      exclude: ["/", "/chat/*"],
      saveRedirectToCookie: true,
    },
  },
})