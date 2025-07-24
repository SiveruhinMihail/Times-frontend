import { defineStore } from "pinia";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: process.client ? localStorage.getItem("token") : null,
    refreshToken: process.client ? localStorage.getItem("refresh_token") : null,
  }),
  actions: {
    setTokens(access: string, refresh: string) {
      this.accessToken = access;
      this.refreshToken = refresh;
      if (process.client) {
        localStorage.setItem("token", access);
        localStorage.setItem("refresh_token", refresh);
      }
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      if (process.client) {
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
          }
        );
        const access = response.data.access_token;

        this.accessToken = access;
        localStorage.setItem("token", access);

        return access;
      } catch (error) {
        console.log(error);
        this.clearTokens();
        throw error;
      }
    },
  },
});
