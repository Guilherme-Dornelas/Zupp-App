import axios from "axios";

export const api = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function request<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  config?: Record<string, unknown>
): Promise<T> {
  const response = await api.request<T>({ method, url, data, ...config });
  return response.data;
}