import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { User } from '@/@types/user'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type UserState = {
  filter: CommonFilterRequest
  users: User[]
  selectedUser: User | null
  drawerOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setUsers: (users: User[]) => void
  setSelectedUser: (user: User | null) => void
  setDrawerOpen: (open: boolean) => void
  clearFilter: () => void
}

export const initialUserState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  users: [],
  selectedUser: null,
  drawerOpen: false,
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    ...initialUserState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setUsers: (users) => set({ users }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setDrawerOpen: (open) => set({ drawerOpen: open }),
    clearFilter: () => set({ filter: initialUserState.filter }),
  })),
)
