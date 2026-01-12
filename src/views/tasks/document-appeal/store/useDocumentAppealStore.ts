import { create } from 'zustand'
import { DocumentAppeal } from '../types/documentAppeal.type'

type DialogView = 'VIEW' | 'CREATE' | 'EDIT'

interface DocumentAppealStore {
  dialogOpen: boolean
  dialogView: DialogView
  selectedTask: DocumentAppeal | null
  filters: {
    page?: number
    limit?: number
    search?: string
  }
  openDialog: (view: DialogView) => void
  closeDialog: () => void
  setSelectedTask: (task: DocumentAppeal | null) => void
  setFilters: (filters: any) => void
}

export const useDocumentAppealStore = create<DocumentAppealStore>((set) => ({
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
