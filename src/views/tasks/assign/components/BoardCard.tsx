import { Task } from '@/@types/task'
import { Card, CardProps, Tag } from '@/components/ui'
import { TaskPriority, TaskType, TaskTypeLabels } from '@/enums/task.enum'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { forwardRef } from 'react'
import { HiChevronDoubleUp, HiChevronDown, HiMenu, HiMenuAlt4 } from 'react-icons/hi'

interface BoardCardProps extends CardProps {
  data: Task
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

const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
  const { data, ...rest } = props

  const { id, name, assignedUsers } = data

  return (
    <Card ref={ref} clickable className="bg-gray-50 hover:shadow-lg rounded-lg" bodyClass="p-4" {...rest}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">{id}</p>
          <Tag prefix prefixClass={`${taskTypeColors[data.type]}`}>
            {TaskTypeLabels[data.type]}
          </Tag>
        </div>
        <h6>{name}</h6>
        <div className="flex justify-between items-center mt-3">
          <UsersAvatarGroup avatarProps={{ size: 25 }} users={assignedUsers} />
          <div className="flex items-center gap-2">{priorityIcons[data.priority]}</div>
        </div>
      </div>
    </Card>
  )
})

BoardCard.displayName = 'BoardCard'

export default BoardCard
