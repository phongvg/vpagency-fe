export interface UserStatisticResponse {
  total: number
  byStatus: ByStatus
  byRole: ByRole[]
}

export interface ByRole {
  _count: number
  roles: string[]
}

export interface ByStatus {
  active: number
  inactive: number
  onboarding: number
}
