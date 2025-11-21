import { TaskFrequency, TaskPriority, TaskPriorityLabels, TaskType, TaskTypeLabels } from '@/enums/task.enum'

export const typeOptions = Object.values(TaskType).map((type) => ({
  value: type,
  label: TaskTypeLabels[type],
}))

export const frequencyOptions = Object.values(TaskFrequency).map((freq) => ({
  value: freq,
  label: freq === TaskFrequency.ONCE ? 'Một lần' : 'Hàng ngày',
}))

export const priorityOptions = Object.values(TaskPriority).map((priority) => ({
  value: priority,
  label: TaskPriorityLabels[priority],
}))
