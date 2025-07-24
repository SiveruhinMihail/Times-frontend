import type { CustomFetchHeaders } from "~/types/fetch";

export const useApi = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const $api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    async onRequest({ options }) {
      if (authStore.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.accessToken}`,
        } as CustomFetchHeaders;
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        const errorMessage = response._data?.data?.detail;
        const isTokenInvalid = (message: string) =>
          ["Токен недействителен или просрочен"].includes(message);

        if (isTokenInvalid(errorMessage)) {
          try {
            const newAccessToken = await authStore.refreshAccessToken();

            if (response._data?.data.config) {
              const { url, method, params } = response._data.data.config;
              const API = config.public.apiBaseUrl.slice(0, -5);
              return await $fetch(API + url, {
                method,
                params,
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
            }
          } catch (error) {
            authStore.clearTokens();
            navigateTo("/auth/login");
            throw error;
          }
        } else {
          authStore.clearTokens();

          navigateTo("/auth/login");
        }
      }

      throw response._data;
    },
  });

  return $api;
};
