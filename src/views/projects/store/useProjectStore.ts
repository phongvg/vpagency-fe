import { CommonFilterRequest } from '@/@types/common'
import { Project } from '@/@types/project'
import { ProjectStatus, ProjectType } from '@/enums/project.enum'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProjectFilter = CommonFilterRequest & {
  status?: ProjectStatus
  type?: ProjectType
  ownerId?: string
}

type ProjectState = {
  filter: ProjectFilter
  projects: Project[]
  selectedProject: Project | null
  dialogOpen: boolean

  setFilter: (filter: ProjectFilter) => void
  setSearch: (search: string) => void
  setProjects: (projects: Project[]) => void
  setSelectedProject: (project: Project | null) => void
  setDialogOpen: (open: boolean) => void
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
    setDialogOpen: (open) => set({ dialogOpen: open }),
    clearFilter: () => set({ filter: initialProjectState.filter }),
  })),
)
