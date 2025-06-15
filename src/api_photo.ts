import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

interface ApiError {
  detail: string
}

interface RefreshResponse {
  access: string
}

const api_photo: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FILES_API_URL as string,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

api_photo.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<ApiError>) => {
    if (!error.config) return Promise.reject(error)

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      const errorMessage = error.response.data?.detail
      const isTokenInvalid = [
        'Токен недействителен или просрочен',
        'Token is invalid or expired',
      ].includes(errorMessage || '')

      if (isTokenInvalid) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const response = await api_photo.get<RefreshResponse>('auth/refresh', {
          headers: { 'jwt-refresh': refreshToken },
        })

        localStorage.setItem('token', response.data.access)
        originalRequest.headers['authorization'] = `Bearer ${response.data.access}`

        return api_photo(originalRequest)
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

api_photo.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)
export default api_photo
