import { CommonFilterRequest } from '@/@types/common'
import { Project } from '@/views/projects/types/project.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProjectState = {
  filter: CommonFilterRequest
  projects: Project[]
  selectedProject: Project | null
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setProjects: (projects: Project[]) => void
  setSelectedProject: (project: Project | null) => void
  openDialog: () => void
  closeDialog: () => void
  clearFilter: () => void
}

export const initialProjectState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
  },
  projects: [],
  selectedProject: null,
  dialogOpen: false,
}

export const useProjectStore = create<ProjectState>()(
  devtools((set, get) => ({
    ...initialProjectState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setProjects: (projects) => set({ projects }),
    setSelectedProject: (project) => set({ selectedProject: project }),
    openDialog: () => set({ dialogOpen: true }),
    closeDialog: () => set({ selectedProject: null, dialogOpen: false }),
    clearFilter: () => set({ filter: initialProjectState.filter }),
  })),
)
