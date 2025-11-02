import { CommonFilterRequest } from '@/@types/common'
import { AdsAccountStatus } from '@/enums/adsAccount.enum'

export type AdsAccountListFilterRequest = CommonFilterRequest & {
  managerId?: string
  projectId?: string
  adsGroupId?: string
  status?: AdsAccountStatus
}

export type CreateAdsAccountRequest = {
  uuid: string
  managerId?: string
  status?: AdsAccountStatus
  profileGenLogin?: string
  gmail?: string
  recoverPassword?: string
  twoFactorCode?: string
  createdDate?: Date
  adsGroupId?: string
}

export type UpdateAdsAccountRequest = {
  uuid?: string
  managerId?: string
  status?: AdsAccountStatus
  profileGenLogin?: string
  gmail?: string
  recoverPassword?: string
  twoFactorCode?: string
  createdDate?: Date
  projectId?: string
  totalSpent?: number
}
