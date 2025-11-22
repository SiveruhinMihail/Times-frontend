export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@formkit/nuxt", "@nuxtjs/tailwindcss"],
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3001/api/",
      filesUrl: process.env.NUXT_PUBLIC_FILES_URL || "http://localhost:8080",
    },
  },
});
