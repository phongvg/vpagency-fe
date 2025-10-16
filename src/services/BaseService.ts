import axios, { HttpStatusCode, AxiosError, InternalAxiosRequestConfig } from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { ACCESS_TOKEN_KEY, USER_ID } from '@/constants/app.constant'
import { localStorageUtils } from '@/utils/storage'
import { urlConfig } from '@/configs/urls.config'
import { BaseResponse } from '@/@types/common'
import { RefreshTokenResponse } from '@/@types/auth'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

BaseService.interceptors.request.use(
  (config) => {
    const accessToken = localStorageUtils.getItem(ACCESS_TOKEN_KEY)

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

BaseService.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`
            return BaseService(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const userId = localStorageUtils.getItem(USER_ID)

        const response = await axios.post<BaseResponse<RefreshTokenResponse>>(
          `${appConfig.apiPrefix}/auth/refresh`,
          { userId },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )

        const newAccessToken = response.data.data.accessToken

        localStorageUtils.setItem(ACCESS_TOKEN_KEY, newAccessToken)

        BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${newAccessToken}`

        processQueue(null, newAccessToken)

        return BaseService(originalRequest)
      } catch (err: Error | any) {
        processQueue(err, null)
        localStorage.clear()
        window.location.href = urlConfig.login
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default BaseService
