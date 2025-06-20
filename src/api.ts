import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

interface ApiError {
  detail: string
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore()
  if (authStore.accessToken && config.headers) {
    config.headers['authorization'] = `Bearer ${authStore.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<ApiError>) => {
    if (!error.config) return Promise.reject(error)

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const authStore = useAuthStore()

    // Обработка 401 ошибки
    if (error.response?.status === 401 && !originalRequest._retry) {
      const errorMessage = error.response.data?.detail
      const isTokenInvalid = [
        'Токен недействителен или просрочен',
        'Token is invalid or expired',
      ].includes(errorMessage || '')

      if (isTokenInvalid) {
        authStore.clearTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const newAccessToken = await authStore.refreshAccessToken()
        originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        authStore.clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
