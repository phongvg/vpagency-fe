import { Columns } from '@/views/tasks/assign/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type BoardState = {
  board: Columns

  setBoard: (board: Columns | ((prev: Columns) => Columns)) => void
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

    setBoard: (board) =>
      set((state) => ({
        board: typeof board === 'function' ? board(state.board) : board,
      })),
    clearBoard: () => set(() => ({ ...initialBoardState })),
  })),
)
