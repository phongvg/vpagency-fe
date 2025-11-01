import { CommonFilterRequest } from '@/@types/common'

export type AdsGroupListFilterRequest = CommonFilterRequest & {
  managerId?: string
}

export type CreateAdsGroupRequest = {
  name: string
  description?: string
  managerId?: string
  projectId?: string
}

export type UpdateAdsGroupRequest = {
  name?: string
  description?: string
  managerId?: string
  projectId?: string
}
