import { CommonFilterRequest } from '@/@types/common'
import { Role } from '@/enums/role.enum'

export type UserListFilterRequest = CommonFilterRequest & {
  role?: Role
}

export type UpdateUserRequest = {
  username: string
  firstName: string
  lastName: string
  email: string
  roles: Role[]
}

export type ResetPasswordUserRequest = {
  newPassword: string
  confirmPassword?: string
}
