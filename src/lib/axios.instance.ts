import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies()
const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    "Content-Type": "application/json"
  }
})


axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access")
    }

    return Promise.reject(error)
  }
)

export default Axios;