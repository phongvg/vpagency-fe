import { AxiosError } from 'axios'

export interface ApiErrorResponse {
  code: string
  message: string
  success: boolean
}

export type ApiAxiosError = AxiosError<ApiErrorResponse>
