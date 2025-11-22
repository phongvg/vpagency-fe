import { MasterData } from '@/@types/masterData'
import { User } from '@/@types/user'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'

export interface Project {
  id: string
  name: string
  typeId: string
  type: MasterData
  statusId: string
  status: MasterData
  ownerId: string
  owner: User
  finalUrls: Partial<FinalUrl>[]
  createdAt: string | Date | null
  updatedAt: string | Date | null
}

export type UpdateProjectRequest = Partial<Project>
