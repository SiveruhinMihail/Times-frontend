import type { CustomFetchHeaders } from "~/types/domains/api";

export const useApi = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const api = async (request: string, options: any = {}) => {
    try {
      const headers = {
        ...options.headers,
        ...(authStore.accessToken && {
          Authorization: `Bearer ${authStore.accessToken}`,
        }),
      } as CustomFetchHeaders;

      return await $fetch(request, {
        ...options,
        baseURL: config.public.apiBaseUrl,
        headers,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        const errorMessage = error.response?._data?.data?.detail;
        const isTokenInvalid = ["Токен недействителен или просрочен"].includes(
          errorMessage
        );

        if (isTokenInvalid) {
          try {
            const newAccessToken = await authStore.refreshAccessToken();

            const headers = {
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            } as CustomFetchHeaders;

            return await $fetch(request, {
              ...options,
              baseURL: config.public.apiBaseUrl,
              headers,
            });
          } catch (refreshError) {
            authStore.clearTokens();
            navigateTo("/auth/login");
            throw refreshError;
          }
        } else {
          authStore.clearTokens();
          navigateTo("/auth/login");
          throw error;
        }
      }
      throw error;
    }
  };

  return api;
};
