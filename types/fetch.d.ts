import type { Headers } from "ofetch";

export interface CustomFetchHeaders extends Headers {
  Authorization?: string;
  "jwt-refresh"?: string;
}

declare module "ofetch" {
  interface FetchOptions {
    headers?: CustomFetchHeaders | Record<string, string>;
  }
}

// Интерфейс для ответа API
export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
  };
}
