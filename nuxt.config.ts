export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@formkit/nuxt", "@nuxtjs/tailwindcss"],
  devServer: {
    port: 8000,
    host: "172.27.160.1",
  },
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
});
