import { AdsGroup } from '@/@types/adsGroup'
import { User } from '@/@types/user'
import { AdsAccountStatus } from '@/enums/adsAccount.enum'

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
