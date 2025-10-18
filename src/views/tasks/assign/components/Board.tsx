import { Task } from '@/@types/task'
import { TaskStatus } from '@/enums/task.enum'
import { toastError, toastSuccess } from '@/utils/toast'
import BoardColumn from '@/views/tasks/assign/components/BoardColumn'
import { useGetTasksGroupedByStatus, useUpdateTaskStatus } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'

export default function Board() {
  const { board, setBoard } = useBoardStore()
  const query = useGetTasksGroupedByStatus()

  useEffect(() => {
    if (query.data && query.isSuccess) {
      setBoard(query.data)
    }
  }, [query.data, query.isSuccess, setBoard])

  const updateTaskStatus = useUpdateTaskStatus()
  const [originalContainer, setOriginalContainer] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeId = active.id as string

    const container = findContainer(activeId)
    setOriginalContainer(container)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = [
      TaskStatus.PENDING,
      TaskStatus.IN_PROGRESS,
      TaskStatus.COMPLETED,
      TaskStatus.CANCELLED,
    ].includes(overId as TaskStatus)
      ? overId
      : findContainer(overId)

    if (!activeContainer || !overContainer) return
    if (activeContainer === overContainer) return

    // Di chuyển task giữa các containers
    setBoard((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      if (!activeItems || !overItems) return prev

      const activeIndex = activeItems.findIndex((item: Task) => item.id === activeId)
      const activeItem = activeItems[activeIndex]

      if (!activeItem) return prev

      const newActiveItems = activeItems.filter((item: Task) => item.id !== activeId)
      const newOverItems = [...overItems, activeItem]

      return {
        ...prev,
        [activeContainer]: newActiveItems,
        [overContainer]: newOverItems,
      }
    })
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setOriginalContainer(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = originalContainer
    const overContainer = [
      TaskStatus.PENDING,
      TaskStatus.IN_PROGRESS,
      TaskStatus.COMPLETED,
      TaskStatus.CANCELLED,
    ].includes(overId as TaskStatus)
      ? overId
      : findContainer(overId)

    if (!activeContainer || !overContainer) {
      setOriginalContainer(null)
      return
    }

    // Nếu di chuyển trong cùng cột
    if (activeContainer === overContainer) {
      setBoard((prev) => {
        const items = prev[activeContainer]
        const oldIndex = items.findIndex((item: Task) => item.id === activeId)
        const newIndex = items.findIndex((item: Task) => item.id === overId)

        return {
          ...prev,
          [activeContainer]: arrayMove(items, oldIndex, newIndex >= 0 ? newIndex : items.length - 1),
        }
      })
      setOriginalContainer(null)
      return
    }

    try {
      const response = await updateTaskStatus.mutateAsync({
        taskId: activeId,
        status: overContainer,
      })

      toastSuccess(response.message)
    } catch (error) {
      toastError('Cập nhật trạng thái thất bại')
    }

    setOriginalContainer(null)
  }

  const findContainer = (id: string): string | null => {
    for (const [status, tasks] of Object.entries(board)) {
      if (tasks.some((task) => task.id === id)) {
        return status
      }
    }

    return null
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex flex-col flex-auto mb-2 w-full h-full scrumboard">
        <div className="gap-6 grid grid-cols-4 mt-4 max-w-full h-full scrumboard-body">
          {Object.entries(board).map(([status, tasks]) => (
            <BoardColumn key={status} title={status} tasks={tasks as Task[]} />
          ))}
        </div>
      </div>
    </DndContext>
  )
}
