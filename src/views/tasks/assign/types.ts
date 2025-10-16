import { Task } from '@/@types/task'
import { TaskStatus } from '@/enums/task.enum'
import { DraggableChildrenFn } from 'react-beautiful-dnd'

export interface BaseBoardProps {
  contents?: Task[]
  useClone?: DraggableChildrenFn
  isCombineEnabled?: boolean
}

export type Columns = Record<string, Task[]>
