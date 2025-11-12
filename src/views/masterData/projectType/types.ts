import { CommonFilterRequest } from '@/@types/common'

export type ProjectTypeFilterRequest = CommonFilterRequest

export type CreateProjectTypeRequest = {
  name: string
  description?: string | null
}

export type UpdateProjectTypeRequest = {
  name?: string
  description?: string | null
}
