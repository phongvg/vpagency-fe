import { Task } from '@/@types/task'
import { Loading } from '@/components/shared'
import { toastError, toastSuccess } from '@/utils/toast'
import BoardColumn from '@/views/tasks/assign/components/BoardColumn'
import { useTasksBoard, useUpdateTaskStatus } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { reorderQuoteMap } from '@/views/tasks/assign/utils'
import { useCallback, useMemo } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

export default function Board() {
  const { board, isLoading } = useTasksBoard()
  const { setBoard } = useBoardStore()
  const updateTaskStatus = useUpdateTaskStatus()

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return

      const { source, destination, draggableId } = result

      if (source.droppableId === destination.droppableId && source.index === destination.index) return

      if (source.droppableId === destination.droppableId) {
        const newData = reorderQuoteMap({
          quoteMap: board,
          source,
          destination,
        })
        setBoard(newData.quoteMap)
        return
      }

      try {
        const response = await updateTaskStatus.mutateAsync({
          taskId: draggableId,
          status: destination.droppableId,
        })

        const newData = reorderQuoteMap({
          quoteMap: board,
          source,
          destination,
        })
        setBoard(newData.quoteMap)

        toastSuccess(response.message)
      } catch (error) {
        toastError('Cập nhật trạng thái thất bại')
      }
    },
    [board, setBoard, updateTaskStatus],
  )

  const boardEntries = useMemo(() => {
    return board ? Object.entries(board) : []
  }, [board])

  return (
    <Loading loading={isLoading}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`flex flex-col flex-auto mb-2 w-full h-full scrumboard ${
                snapshot.isDraggingOver ? 'dragging-over' : ''
              }`}
              {...provided.droppableProps}
              style={{
                transition: snapshot.isDraggingOver ? 'none' : undefined,
              }}
            >
              <div className="gap-6 grid grid-cols-4 mt-4 max-w-full h-full scrumboard-body">
                {boardEntries.map(([status, tasks], index) => (
                  <BoardColumn
                    key={status}
                    title={status}
                    index={index}
                    isScrollable={false}
                    contents={tasks as Task[]}
                    isCombineEnabled={false}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Loading>
  )
}
