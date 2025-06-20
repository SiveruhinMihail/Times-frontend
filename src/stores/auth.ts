import { defineStore } from 'pinia'
import api from '@/api'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
  }),

  actions: {
    setTokens(access: string, refresh: string) {
      this.accessToken = access
      this.refreshToken = refresh
      localStorage.setItem('token', access)
      localStorage.setItem('refresh_token', refresh)
    },

    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
      localStorage.clear()
    },

    async refreshAccessToken(): Promise<string> {
      if (!this.refreshToken) {
        this.clearTokens()
        throw new Error('No refresh token')
      }

      try {
        const response = await api.get<{ access: string }>('auth/refresh', {
          headers: { 'jwt-refresh': this.refreshToken },
        })

        this.accessToken = response.data.access
        localStorage.setItem('token', this.accessToken)
        return this.accessToken
      } catch (error) {
        this.clearTokens()
        throw error
      }
    },
  },
})
