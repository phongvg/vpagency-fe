export type GmailStatus = {
  id: string
  name: string
  description: string | null
  active: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export type UpdateGmailStatusRequest = Partial<GmailStatus>
