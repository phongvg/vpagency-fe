import { Task } from '@/@types/task'
import { Badge } from '@/components/ui'
import { TaskStatus, TaskStatusLabels } from '@/enums/task.enum'
import BoardCard from '@/views/tasks/assign/components/BoardCard'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type Props = {
  title: string
  tasks: Task[]
}

export default function BoardColumn({ title, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  })

  return (
    <div className="flex flex-col gap-2 mb-3 p-0 rounded-lg w-full board-column">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-t-lg">
        <h6>{TaskStatusLabels[title as TaskStatus]}</h6>
        <Badge content={tasks.length} />
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 p-2 min-h-[200px] rounded-b-lg transition-colors ${
          isOver ? 'bg-blue-50 border-2 border-blue-200 border-dashed' : 'bg-gray-50'
        }`}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {tasks.map((task) => (
              <BoardCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
