import BoardCardList from '@/views/tasks/assign/components/BoardCardList'
import BoardTitle from '@/views/tasks/assign/components/BoardTitle'
import { BaseBoardProps } from '@/views/tasks/assign/types'
import { Draggable } from 'react-beautiful-dnd'

interface BoardColumnProps extends BaseBoardProps {
  title: string
  index: number
  isScrollable?: boolean
}

export default function BoardColumn({
  title,
  index,
  isScrollable,
  contents,
  isCombineEnabled,
  useClone,
}: BoardColumnProps) {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="flex flex-col gap-2 mb-3 p-0 rounded-lg w-full board-column"
          {...provided.draggableProps}
        >
          <BoardTitle title={title} dragHandleProps={provided.dragHandleProps} />
          <BoardCardList
            listId={title}
            listType="CONTENT"
            contents={contents}
            internalScroll={isScrollable}
            isCombineEnabled={isCombineEnabled}
            useClone={useClone}
          />
        </div>
      )}
    </Draggable>
  )
}
