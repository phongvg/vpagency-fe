import { CommonFilterRequest } from '@/@types/common'

export type UserListFilterRequest = CommonFilterRequest

export type UpdateUserRequest = {
  username: string
  firstName: string
  lastName: string
  email: string
}
