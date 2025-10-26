export type AdsGroup = {
  id: string
  name: string
  description?: string | null
  managerId?: string | null
  manager?: {
    id: string
    username: string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    email?: string | null
  } | null
  createdAt: Date
  updatedAt: Date
}
