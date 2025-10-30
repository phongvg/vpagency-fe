import { AdsGroup } from '@/@types/adsGroup'
import { User } from '@/@types/user'

export enum AdsAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  APPEALED = 'APPEALED',
  DELETED = 'DELETED',
}

export type AdsAccount = {
  id: string
  uuid: string
  managerId?: string | null
  manager?: User | null
  status: AdsAccountStatus
  profileGenLogin?: string | null
  gmail?: string | null
  recoverPassword?: string | null
  twoFactorCode?: string | null
  createdDate?: Date | null
  adsGroupId?: string | null
  adsGroup?: AdsGroup | null
  totalSpent?: number | null
  createdAt: Date
  updatedAt: Date
}
