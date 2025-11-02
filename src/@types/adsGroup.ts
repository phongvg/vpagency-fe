import { AdsAccount } from '@/@types/adsAccount'
import { Project } from '@/@types/project'
import { User } from '@/@types/user'

export type AdsGroup = {
  id: string
  name: string
  description: string | null
  managerId: string | null
  manager: User | null
  projectId: string | null
  project: Project | null
  adsAccounts: AdsAccount[]
  createdAt: Date
  updatedAt: Date
}
