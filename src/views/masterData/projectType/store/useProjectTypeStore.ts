import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { ProjectType } from '@/@types/projectType'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProjectTypeState = {
  filter: CommonFilterRequest
  projectTypes: ProjectType[]
  selectedProjectType: ProjectType | null
  dialogOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setProjectTypes: (projectTypes: ProjectType[]) => void
  setSelectedProjectType: (projectType: ProjectType | null) => void
  setDialogOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
  clearFilter: () => void
}

export const initialProjectTypeState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  projectTypes: [],
  selectedProjectType: null,
  dialogOpen: false,
  deleteDialogOpen: false,
}

export const useProjectTypeStore = create<ProjectTypeState>()(
  devtools((set, get) => ({
    ...initialProjectTypeState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setProjectTypes: (projectTypes) => set({ projectTypes }),
    setSelectedProjectType: (projectType) => set({ selectedProjectType: projectType }),
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialProjectTypeState.filter }),
  })),
)
