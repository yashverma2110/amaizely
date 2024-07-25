import axios from "axios"
import BaseUrl from "@/constants/BaseUrl"

const AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? BaseUrl.DEV : BaseUrl.PROD,
  withCredentials: true
})

export function setHeaders(headers: Record<string, string>): void {
  Object.entries(headers).forEach(([key, value]) => {
    AxiosInstance.defaults.headers.common[key] = value;
  });
}

export default AxiosInstance