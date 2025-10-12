import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from '@/constants/route.constant'

export const urlConfig = {
  dashboard: `${APP_PREFIX_PATH}/dashboard`,
  taskAssign: `${APP_PREFIX_PATH}/task/assign`,
  taskReceive: `${APP_PREFIX_PATH}/task/receive`,
  taskReport: `${APP_PREFIX_PATH}/task/report`,
  customerList: `${APP_PREFIX_PATH}/customer/list`,
  customerUpdate: `${APP_PREFIX_PATH}/customer/update`,
  financeSales: `${APP_PREFIX_PATH}/finance/sales`,
  financeReport: `${APP_PREFIX_PATH}/finance/report`,
  systemUserManagement: `${APP_PREFIX_PATH}/system/user`,
  systemLogs: `${APP_PREFIX_PATH}/system/logs`,
  systemSetting: `${APP_PREFIX_PATH}/system/setting`,
  staffRanking: `${APP_PREFIX_PATH}/staff/ranking`,
  userUpdateInfo: `${APP_PREFIX_PATH}/update-info`,
  userProfile: `${APP_PREFIX_PATH}/profile`,
  accessDenied: `${APP_PREFIX_PATH}/access-denied`,

  login: `${AUTH_PREFIX_PATH}/login`,
  loginTelegram: `${AUTH_PREFIX_PATH}/telegram`,
}
