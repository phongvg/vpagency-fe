import { CommonFilterRequest } from '@/@types/common'
import { Role } from '@/enums/role.enum'

export type UserListFilterRequest = CommonFilterRequest

export type UpdateUserRequest = {
  username: string
  firstName: string
  lastName: string
  email: string
  roles: Role[]
}
