import { CommonFilterRequest } from '@/@types/common'

export type ProjectStatusFilterRequest = CommonFilterRequest

export type CreateProjectStatusRequest = {
  name: string
  description?: string | null
  color?: string | null
}

export type UpdateProjectStatusRequest = {
  name?: string
  description?: string | null
  color?: string | null
}
