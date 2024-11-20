import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface basicParams extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  noAuth?: true;
}
interface paramsWithConfig extends basicParams {
  sendConfig: true;
}

interface paramsWithoutConfig extends basicParams {
  sendConfig?: never;
}

function makeApiCall<T>(
  params: paramsWithConfig
): Promise<AxiosResponse<T, any>>;

function makeApiCall<T>(params: paramsWithoutConfig): Promise<T>;

async function makeApiCall<T>({
  url,
  method = "GET",
  data,
  noAuth,
  sendConfig,
  ...config
}: paramsWithConfig | paramsWithoutConfig) {
  let headers: Record<string, string> = {};
  const token = localStorage.getItem("token");

  if (token !== null && !noAuth) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await axios<T>({
      method,
      data,
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      headers,
      ...config,
    });
    return sendConfig ? response : response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw error;
  }
}

export interface errType {
  message: string;
  code: number | string;
  err?: any;
}

function checkErrorHasMessage(err: any): err is errType {
  return err?.message !== undefined;
}

export { makeApiCall, checkErrorHasMessage };
