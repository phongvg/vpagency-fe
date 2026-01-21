export enum TaskType {
  SET_CAMPAIGN = 'SET_CAMPAIGN',
  LAUNCH_CAMPAIGN = 'LAUNCH_CAMPAIGN',
  NURTURE_ACCOUNT = 'NURTURE_ACCOUNT',
  APPEAL_ACCOUNT = 'APPEAL_ACCOUNT', // Kháng tài khoản
  DOCUMENT_APPEAL = 'DOCUMENT_APPEAL', // Kháng giấy
  RESEARCH = 'RESEARCH', // Nghiên cứu
}

export const TaskTypeLabels: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: 'Lên camp',
  [TaskType.LAUNCH_CAMPAIGN]: 'Duy trì camp',
  [TaskType.NURTURE_ACCOUNT]: 'Nuôi tài khoản',
  [TaskType.APPEAL_ACCOUNT]: 'Kháng tài khoản',
  [TaskType.DOCUMENT_APPEAL]: 'Kháng giấy',
  [TaskType.RESEARCH]: 'Nghiên cứu',
}

export enum TaskFrequency {
  DAILY = 'DAILY',
  ONCE = 'ONCE',
}

export const TaskFrequencyLabels: Record<TaskFrequency, string> = {
  [TaskFrequency.DAILY]: 'Hàng ngày',
  [TaskFrequency.ONCE]: 'Một lần',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export const TaskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'Thấp',
  [TaskPriority.MEDIUM]: 'Trung bình',
  [TaskPriority.HIGH]: 'Cao',
  [TaskPriority.URGENT]: 'Khẩn cấp',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'Chờ xử lý',
  [TaskStatus.IN_PROGRESS]: 'Đang tiến hành',
  [TaskStatus.COMPLETED]: 'Hoàn thành',
  [TaskStatus.CANCELLED]: 'Đã hủy',
}

export const TaskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'gray-500',
  [TaskStatus.IN_PROGRESS]: 'yellow-500',
  [TaskStatus.COMPLETED]: 'green-500',
  [TaskStatus.CANCELLED]: 'red-500',
}
