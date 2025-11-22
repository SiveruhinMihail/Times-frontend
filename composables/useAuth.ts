export const useAuth = () => {
  const user = ref<any>(null);
  const isAuthenticated = ref(false);
  const $api = useApi();
  const config = useRuntimeConfig();
  const router = useRouter();

  const checkAuth = async (): Promise<void> => {
    try {
      const data = await $api("auth/me", {
        method: "GET",
      });

      user.value = data;
      isAuthenticated.value = !(data === undefined || data === 1);
    } catch (err) {
      console.log("Auth error:", err);
      user.value = null;
      isAuthenticated.value = false;
      router.push("/");
    }
  };

  const logout = (): void => {
    user.value = null;
    isAuthenticated.value = false;
    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    checkAuth,
    logout,
  };
};
