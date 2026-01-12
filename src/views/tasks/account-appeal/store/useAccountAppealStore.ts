import { create } from 'zustand'
import { AccountAppeal } from '../types/accountAppeal.type'

type DialogView = 'VIEW' | 'CREATE' | 'EDIT'

interface AccountAppealStore {
  dialogOpen: boolean
  dialogView: DialogView
  selectedTask: AccountAppeal | null
  filters: {
    page?: number
    limit?: number
    search?: string
  }
  openDialog: (view: DialogView) => void
  closeDialog: () => void
  setSelectedTask: (task: AccountAppeal | null) => void
  setFilters: (filters: any) => void
}

export const useAccountAppealStore = create<AccountAppealStore>((set) => ({
  dialogOpen: false,
  dialogView: 'VIEW',
  selectedTask: null,
  filters: {
    page: 1,
    limit: 10,
  },
  openDialog: (view) => set({ dialogOpen: true, dialogView: view }),
  closeDialog: () => set({ dialogOpen: false, selectedTask: null }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilters: (filters) => set({ filters }),
}))
