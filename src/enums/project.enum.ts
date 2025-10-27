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
