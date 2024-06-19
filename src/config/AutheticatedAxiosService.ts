import { getAuthToken } from "@/utils/AuthUtils"
import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Authorization': 'Bearer ' + getAuthToken(),
  }
})

export default AxiosInstance