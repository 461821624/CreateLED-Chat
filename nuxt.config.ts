// https://nuxt.com/docs/api/configuration/nuxt-config
import components from "unplugin-vue-components/vite"
import { AntDesignXVueResolver } from "ant-design-x-vue/resolver"
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
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@ant-design-vue/nuxt",
  ],
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [
      tailwindcss(),
      components({
        resolvers: [AntDesignXVueResolver()],
      }),
    ],
    optimizeDeps: {
      include: ["ant-design-x-vue"],
    },
    ssr: {
      noExternal: ["ant-design-x-vue"], // 避免 SSR 时 external 化
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },
  sourcemap: false,
  // Netlify 部署配置
  nitro: {
    preset: "netlify_edge", // 使用 Netlify Edge Functions
    // 完全禁用预渲染以避免 SSR 错误
    // prerender: {
    //   routes: ["/"],
    // },
  },
  // 启用服务端渲染
  ssr: true,
  supabase: {
    // redirect: false
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/chat/*"],
      saveRedirectToCookie: true,
    },
    // 添加错误处理配置
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
  },
  antd: {
    extractStyle: true,
  },
  imports: {
    autoImport: true,
  },
})