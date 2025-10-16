import { Task } from '@/@types/task'
import BoardCard from '@/views/tasks/assign/components/BoardCard'
import { BaseBoardProps } from '@/views/tasks/assign/types'
import { CSSProperties } from 'react'
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd'

interface BoardCardListProps extends BaseBoardProps {
  ignoreContainerClipping?: boolean
  internalScroll?: boolean
  scrollContainerStyle?: CSSProperties
  isDropDisabled?: boolean
  listId?: string
  style?: CSSProperties
  listType?: string
}

type InnerListProps = {
  dropProvided: DroppableProvided
  contents?: Task[]
}

export default function BoardCardList({
  listId = 'LIST',
  listType,
  contents,
  internalScroll,
  isCombineEnabled,
  style,
  scrollContainerStyle,
  ignoreContainerClipping,
  isDropDisabled,
  useClone,
}: BoardCardListProps) {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={useClone}
    >
      {(dropProvided) => (
        <div
          style={style}
          className="flex-auto bg-gray-100 p-2 rounded-lg overflow-hidden board-wrapper"
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div className="board-scrollContainer" style={scrollContainerStyle}>
              <InnerList contents={contents} dropProvided={dropProvided} />
            </div>
          ) : (
            <InnerList contents={contents} dropProvided={dropProvided} />
          )}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const InnerList = (props: InnerListProps) => {
  const { dropProvided, contents, ...rest } = props

  return (
    <div ref={dropProvided.innerRef} className="h-full board-dropzone">
      <div className="flex flex-col gap-3 h-full">
        {contents?.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(dragProvided) => (
              <BoardCard
                ref={dragProvided.innerRef}
                data={item}
                {...rest}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
              />
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}
