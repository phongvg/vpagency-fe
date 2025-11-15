export type ProjectStatus = {
  id?: string
  name: string
  description: string | null
  active: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export type UpdateProjectStatusRequest = Partial<ProjectStatus>
