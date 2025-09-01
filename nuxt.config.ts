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
      callback: "/confirm",
      exclude: ["/", "/chat/*"],
      saveRedirectToCookie: true,
    },
  },
})