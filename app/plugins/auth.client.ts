export default defineNuxtPlugin(() => {
  console.log("🔄 Auth plugin running...");

  const authStore = useAuthStore();
  authStore.initTokens();

  console.log("✅ Tokens initialized:", {
    accessToken: authStore.accessToken,
    refreshToken: authStore.refreshToken,
  });
});
