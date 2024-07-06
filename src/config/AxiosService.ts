import axios from "axios"
import BaseUrl from "@/constants/BaseUrl"

const AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? BaseUrl.DEV : BaseUrl.PROD,
  withCredentials: true
})

export default AxiosInstance