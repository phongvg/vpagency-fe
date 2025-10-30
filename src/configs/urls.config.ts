import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from '@/constants/route.constant'

export const urlConfig = {
  dashboard: `${APP_PREFIX_PATH}/dashboard`,
  taskAssign: `${APP_PREFIX_PATH}/tasks/assign`,
  taskReport: `${APP_PREFIX_PATH}/tasks/reports`,
  customerList: `${APP_PREFIX_PATH}/customers/list`,
  customerUpdate: `${APP_PREFIX_PATH}/customers/update`,
  financeSales: `${APP_PREFIX_PATH}/finances/sales`,
  financeReport: `${APP_PREFIX_PATH}/finances/reports`,
  users: `${APP_PREFIX_PATH}/systems/users`,
  adsGroups: `${APP_PREFIX_PATH}/systems/ads-groups`,
  adsAccounts: `${APP_PREFIX_PATH}/systems/ads-accounts`,
  projects: `${APP_PREFIX_PATH}/systems/projects`,
  logs: `${APP_PREFIX_PATH}/systems/logs`,
  setting: `${APP_PREFIX_PATH}/systems/settings`,
  staffRanking: `${APP_PREFIX_PATH}/staffs/rankings`,
  userUpdateInfo: `${APP_PREFIX_PATH}/update-info`,
  userProfile: `${APP_PREFIX_PATH}/profile`,
  accessDenied: `${APP_PREFIX_PATH}/access-denied`,

  login: `${AUTH_PREFIX_PATH}/login`,
  loginTelegram: `${AUTH_PREFIX_PATH}/telegram`,
}
