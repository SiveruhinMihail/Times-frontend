export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@formkit/nuxt", "@nuxtjs/tailwindcss"],
  devServer: {
    port: 8000, // Порт для разработки (nuxt dev)
    host: "127.0.0.1", // Доступ с других устройств в сети
  },
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8000/",
    },
  },
});
