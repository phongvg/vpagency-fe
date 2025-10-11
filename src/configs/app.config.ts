import { urlConfig } from '@/configs/urls.config'

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  tourPath: string
  locale: string
  enableMock: boolean
}

const appConfig: AppConfig = {
  apiPrefix: import.meta.env.VITE_API_BASE_URL,
  authenticatedEntryPath: urlConfig.systemPermission,
  unAuthenticatedEntryPath: urlConfig.login,
  tourPath: '/app/account/kyc-form',
  locale: 'en',
  enableMock: false,
}

export default appConfig
