import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'
import { notificationListData, searchQueryPoolData } from './data/commonData'
import {
  projectList,
  scrumboardData,
  issueData,
  projectDashboardData,
} from './data/projectData'
import { usersData, userDetailData } from './data/usersData'
import {
  settingData,
  settingIntergrationData,
  settingBillingData,
  invoiceData,
  logData,
  accountFormData,
} from './data/accountData'
import { signInUserData } from './data/authData'

import {
  commonFakeApi,
  projectFakeApi,
  accountFakeApi,
  authFakeApi,
} from './fakeApi'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
  return createServer({
    environment,
    seeds(server) {
      server.db.loadData({
        notificationListData,
        searchQueryPoolData,
        projectList,
        scrumboardData,
        issueData,
        usersData,
        userDetailData,
        settingData,
        settingIntergrationData,
        settingBillingData,
        invoiceData,
        logData,
        accountFormData,
        signInUserData,
        projectDashboardData,
      })
    },
    routes() {
      this.urlPrefix = ''
      this.namespace = ''
      this.passthrough((request) => {
        const isExternal = request.url.startsWith('http')
        const isResource = request.url.startsWith('data:text')
        return isExternal || isResource
      })
      this.passthrough()

      commonFakeApi(this, apiPrefix)
      projectFakeApi(this, apiPrefix)
      accountFakeApi(this, apiPrefix)
      authFakeApi(this, apiPrefix)
    },
  })
}
