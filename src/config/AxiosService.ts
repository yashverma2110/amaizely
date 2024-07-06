import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

export default AxiosInstance