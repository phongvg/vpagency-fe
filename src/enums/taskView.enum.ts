export enum TaskViewType {
  SPLIT = 'SPLIT',
  KANBAN = 'KANBAN',
}

export const TaskViewLabels: Record<TaskViewType, string> = {
  [TaskViewType.SPLIT]: 'Danh sách',
  [TaskViewType.KANBAN]: 'Bảng Kanban',
}
