import { Task, TasksFilterRequest } from '@/@types/task'
import { TaskViewType } from '@/enums/taskView.enum'
import { Columns } from '@/views/tasks/assign/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type DialogView = 'CREATE' | 'EDIT' | 'VIEW' | ''

type BoardState = {
  board: Columns
  dialogView: DialogView
  dialogOpen: boolean
  taskId: string | null
  selectedTask: Task | null
  activeView: TaskViewType
  filters: TasksFilterRequest

  setBoard: (board: Columns | ((prev: Columns) => Columns)) => void
  clearBoard: () => void
  openDialog: (view: DialogView, taskId?: string | null) => void
  closeDialog: () => void
  setDialogView: (view: DialogView) => void
  setSelectedTask: (task: Task | null) => void
  setActiveView: (view: TaskViewType) => void
  setFilters: (filters: TasksFilterRequest) => void
  clearFilters: () => void
}

const initialBoardState: Partial<BoardState> = {
  board: {
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: [],
    CANCELLED: [],
  },
  dialogView: 'CREATE' as DialogView,
  dialogOpen: false,
  taskId: null,
  selectedTask: null,
  activeView: TaskViewType.SPLIT,
  filters: {
    page: 1,
    limit: 10,
    search: '',
    status: undefined,
    type: undefined,
    priority: undefined,
    assignedUserId: undefined,
    creatorId: undefined,
    projectId: undefined,
    fromDate: undefined,
    toDate: undefined,
  },
}

export const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    ...initialBoardState,

    setBoard: (board) =>
      set((state) => ({
        board: typeof board === 'function' ? board(state.board) : board,
      })),
    clearBoard: () => set(() => ({ ...initialBoardState })),
    openDialog: (view, taskId) => set(() => ({ dialogView: view, dialogOpen: true, taskId })),
    closeDialog: () => set(() => ({ dialogView: '', dialogOpen: false, taskId: null })),
    setDialogView: (view) => set(() => ({ dialogView: view })),
    setSelectedTask: (task) => set(() => ({ selectedTask: task })),
    setActiveView: (view) => set(() => ({ activeView: view })),
    setFilters: (filters) => set(() => ({ filters })),
    clearFilters: () =>
      set(() => ({
        filters: initialBoardState.filters,
      })),
  })),
)
