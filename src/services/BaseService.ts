import axios, {
  HttpStatusCode,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/app.constant'
import { localStorageUtils } from '@/utils/storage'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
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
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

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

    if (
      !error.response ||
      error.response.status !== HttpStatusCode.Unauthorized ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          if (originalRequest.headers && token) {
            originalRequest.headers[REQUEST_HEADER_AUTH_KEY] =
              `${TOKEN_TYPE}${token}`
          }
          originalRequest._retry = false
          return BaseService(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)

      if (!refreshToken) {
        throw new Error('Refresh token not found')
      }

      const userId = localStorageUtils.getItem('userId')

      if (!userId) {
        throw new Error('User id not found')
      }

      const response = await axios.post(
        `${appConfig.apiPrefix}/auth/refresh`,
        {
          userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      const { accessToken } = response.data.data

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

      if (originalRequest.headers) {
        originalRequest.headers[REQUEST_HEADER_AUTH_KEY] =
          `${TOKEN_TYPE}${accessToken}`
      }

      processQueue(null, accessToken)

      originalRequest._retry = false

      return BaseService(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError as Error, null)

      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorageUtils.removeItem('userId')
      Cookies.remove(REFRESH_TOKEN_KEY)

      window.dispatchEvent(new Event('token-expired'))

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default BaseService
