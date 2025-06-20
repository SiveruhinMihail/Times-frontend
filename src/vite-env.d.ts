/// <reference types="vite/client" />
declare module '@/api' {
  import { AxiosInstance } from 'axios'
  const api: AxiosInstance
  export default api
}

declare module '@/stores/auth' {
  import { DefineStore } from 'pinia'
  const useAuthStore: DefineStore<'auth', any>
  export { useAuthStore }
}
