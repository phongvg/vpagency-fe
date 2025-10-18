import { Task } from '@/@types/task'
import { Card, Tag } from '@/components/ui'
import { TaskPriority, TaskType, TaskTypeLabels } from '@/enums/task.enum'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HiChevronDoubleUp, HiChevronDown, HiMenu, HiMenuAlt4 } from 'react-icons/hi'

type Props = {
  task: Task
}

const priorityIcons: Record<TaskPriority, JSX.Element> = {
  [TaskPriority.LOW]: <HiChevronDown size={20} color="#ff5630" />,
  [TaskPriority.MEDIUM]: <HiMenuAlt4 size={20} color="#ff5630" />,
  [TaskPriority.HIGH]: <HiMenu size={20} color="#ff5630" />,
  [TaskPriority.URGENT]: <HiChevronDoubleUp size={20} color="#ff5630" />,
}

const taskTypeColors: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: 'bg-blue-500',
  [TaskType.LAUNCH_CAMPAIGN]: 'bg-green-500',
  [TaskType.NURTURE_ACCOUNT]: 'bg-purple-500',
  [TaskType.APPEAL_ACCOUNT]: 'bg-yellow-500',
  [TaskType.DOCUMENT_APPEAL]: 'bg-gray-500',
  [TaskType.TEST_LINK]: 'bg-indigo-500',
  [TaskType.RESEARCH]: 'bg-pink-500',
}

export default function BoardCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 hover:shadow-lg rounded-lg cursor-grab active:cursor-grabbing"
      bodyClass="p-4"
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col gap-2">
        <div>
          <Tag prefix prefixClass={`${taskTypeColors[task.type]}`}>
            {TaskTypeLabels[task.type]}
          </Tag>
        </div>
        <h6>{task.name}</h6>
        <div className="flex justify-between items-center">
          <UsersAvatarGroup avatarProps={{ size: 25 }} users={task.assignedUsers} />
          <div className="flex items-center gap-2">{priorityIcons[task.priority]}</div>
        </div>
      </div>
    </Card>
  )
}
