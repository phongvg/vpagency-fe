import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const urlConfig = {
  taskAssign: `${APP_PREFIX_PATH}/task/assign`,
  taskReceive: `${APP_PREFIX_PATH}/task/receive`,
  taskReport: `${APP_PREFIX_PATH}/task/report`,

  customerList: `${APP_PREFIX_PATH}/customer/list`,
  customerUpdate: `${APP_PREFIX_PATH}/customer/update`,

  financeSales: `${APP_PREFIX_PATH}/finance/sales`,
  financeReport: `${APP_PREFIX_PATH}/finance/report`,

  systemAccount: `${APP_PREFIX_PATH}/system/account`,
  systemPermission: `${APP_PREFIX_PATH}/system/permission`,
  systemLogs: `${APP_PREFIX_PATH}/system/logs`,
  systemSetting: `${APP_PREFIX_PATH}/system/setting`,

  staffRanking: `${APP_PREFIX_PATH}/staff/ranking`,

  userUpdateInfo: `${APP_PREFIX_PATH}/update-info`,

  login: '/auth/login',
  loginTelegram: '/auth/telegram',

  signIn: '/sign-in',
  signInTelegram: '/auth/telegram',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',

  accessDenied: '/access-denied',
}
