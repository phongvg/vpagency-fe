import { create } from 'zustand'
import { Research } from '../types/research.type'

type DialogView = 'VIEW' | 'CREATE' | 'EDIT'

interface ResearchStore {
  dialogOpen: boolean
  dialogView: DialogView
  selectedTask: Research | null
  filters: {
    page?: number
    limit?: number
    search?: string
  }
  openDialog: (view: DialogView) => void
  closeDialog: () => void
  setSelectedTask: (task: Research | null) => void
  setFilters: (filters: any) => void
}

export const useResearchStore = create<ResearchStore>((set) => ({
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
