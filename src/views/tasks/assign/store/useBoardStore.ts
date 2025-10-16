import { Columns } from '@/views/tasks/assign/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type BoardState = {
  board: Columns

  setBoard: (board: Columns) => void
  clearBoard: () => void
}

const initialBoardState = {
  board: {
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: [],
    CANCELLED: [],
  },
}

export const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    ...initialBoardState,

    setBoard: (board) => set(() => ({ board })),
    clearBoard: () => set(() => ({ ...initialBoardState })),
  })),
)
