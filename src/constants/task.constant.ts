import { TaskPriority, TaskStatus } from '@/enums/task.enum'

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case TaskStatus.IN_PROGRESS:
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case TaskStatus.COMPLETED:
      return 'bg-green-100 text-green-800 border-green-200'
    case TaskStatus.CANCELLED:
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'bg-red-100 text-red-800 border-red-200'
    case TaskPriority.MEDIUM:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case TaskPriority.LOW:
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
