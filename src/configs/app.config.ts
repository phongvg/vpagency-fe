import { urlConfig } from '@/configs/urls.config'

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  locale: string
  enableMock: boolean
}

const appConfig: AppConfig = {
  apiPrefix: import.meta.env.VITE_API_BASE_URL,
  authenticatedEntryPath: urlConfig.taskAssign,
  unAuthenticatedEntryPath: urlConfig.login,
  locale: 'en',
  enableMock: false,
}

export default appConfig
