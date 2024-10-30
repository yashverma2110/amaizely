import axios from "axios"
import BaseUrl from "@/constants/BaseUrl"
import { isProduction } from "@/utils/EnvUtils";

const AxiosInstance = axios.create({
  baseURL: isProduction() ? BaseUrl.PROD : BaseUrl.DEV,
  withCredentials: true
})

export function setHeaders(headers: Record<string, string>): void {
  Object.entries(headers).forEach(([key, value]) => {
    AxiosInstance.defaults.headers.common[key] = value;
  });
}

export default AxiosInstance