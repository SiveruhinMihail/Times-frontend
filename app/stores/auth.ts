import { defineStore } from "pinia";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    initTokens() {
      if (import.meta.client) {
        this.accessToken = localStorage.getItem("token") || null;
        this.refreshToken = localStorage.getItem("refresh_token") || null;
      }
    },
    setTokens(access: string, refresh: string) {
      this.accessToken = access;
      this.refreshToken = refresh;
      if (import.meta.client) {
        localStorage.setItem("token", access);
        localStorage.setItem("refresh_token", refresh);
      }
    },
    setToken(access: string) {
      this.accessToken = access;
      if (import.meta.client) {
        localStorage.setItem("token", access);
      }
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      if (import.meta.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
      }
    },
    async refreshAccessToken(): Promise<string> {
      const config = useRuntimeConfig();

      if (!this.refreshToken) {
        this.clearTokens();
        throw new Error("No refresh token");
      }

      try {
        const response: any = await $fetch(
          config.public.apiBaseUrl + "auth/refresh",
          {
            method: "POST",
            headers: { "jwt-refresh": this.refreshToken },
          },
        );
        const access = response.data.access_token;

        this.setToken(access);

        return access;
      } catch (error) {
        console.log(error);
        this.clearTokens();
        throw error;
      }
    },
  },
});
