export enum ProjectType {
  SET_CAMPAIGN = 'SET_CAMPAIGN',
  LAUNCH_CAMPAIGN = 'LAUNCH_CAMPAIGN',
}

export enum ProjectStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  WAITING = 'WAITING',
  DONE = 'DONE',
  ON_HOLD = 'ON_HOLD',
}

export const ProjectTypeLabels: Record<ProjectType, string> = {
  [ProjectType.SET_CAMPAIGN]: 'Lên camp',
  [ProjectType.LAUNCH_CAMPAIGN]: 'Duy trì camp',
}

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.RUNNING]: 'Đang chạy',
  [ProjectStatus.STOPPED]: 'Đã dừng',
  [ProjectStatus.WAITING]: 'Đang chờ',
  [ProjectStatus.DONE]: 'Hoàn thành',
  [ProjectStatus.ON_HOLD]: 'Tạm hoãn',
}

export const ProjectStatusOptions = Object.values(ProjectStatus).map((status) => ({
  label: ProjectStatusLabels[status],
  value: status,
}))

export const ProjectTypeOptions = Object.values(ProjectType).map((type) => ({
  label: ProjectTypeLabels[type],
  value: type,
}))

export const ProjectStatusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.RUNNING]: 'emerald-500',
  [ProjectStatus.STOPPED]: 'red-500',
  [ProjectStatus.WAITING]: 'yellow-500',
  [ProjectStatus.DONE]: 'blue-500',
  [ProjectStatus.ON_HOLD]: 'gray-500',
}
