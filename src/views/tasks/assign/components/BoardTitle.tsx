import { TaskStatusLabels } from '@/enums/task.enum'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

type BoardTitleProps = {
  title: string
  dragHandleProps?: DraggableProvidedDragHandleProps | null
}

export default function BoardTitle({ title, dragHandleProps }: BoardTitleProps) {
  return <h6>{TaskStatusLabels[title as keyof typeof TaskStatusLabels]}</h6>
}
