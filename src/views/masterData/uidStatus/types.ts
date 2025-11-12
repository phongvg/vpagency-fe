import { CommonFilterRequest } from '@/@types/common'

export type UidStatusFilterRequest = CommonFilterRequest

export type CreateUidStatusRequest = {
  name: string
  description?: string | null
}

export type UpdateUidStatusRequest = {
  name?: string
  description?: string | null
  active?: boolean
}
