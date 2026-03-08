import { TaskFrequency, TaskPriority, TaskStatus, TaskType } from "@/modules/task/types/task.type";

export const TaskTypeMap: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: "Lên camp",
  [TaskType.LAUNCH_CAMPAIGN]: "Duy trì camp",
  [TaskType.NURTURE_ACCOUNT]: "Nuôi tài khoản",
  [TaskType.APPEAL_ACCOUNT]: "Kháng tài khoản",
  [TaskType.DOCUMENT_APPEAL]: "Kháng giấy",
  [TaskType.RESEARCH]: "Nghiên cứu",
};

export const TaskFrequencyMap: Record<TaskFrequency, string> = {
  [TaskFrequency.DAILY]: "Hàng ngày",
  [TaskFrequency.ONCE]: "Một lần",
};

export const TaskPriorityMap: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Thấp",
  [TaskPriority.MEDIUM]: "Trung bình",
  [TaskPriority.HIGH]: "Cao",
  [TaskPriority.URGENT]: "Khẩn cấp",
};

export const TaskStatusMap: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "Chờ xử lý",
  [TaskStatus.IN_PROGRESS]: "Đang tiến hành",
  [TaskStatus.COMPLETED]: "Hoàn thành",
  [TaskStatus.OVERDUE]: "Trễ deadline",
};

export const statusOptions = Object.entries(TaskStatusMap).map(([value, label]) => ({
  value,
  label,
}));

export const priorityOptions = Object.entries(TaskPriorityMap).map(([value, label]) => ({
  value,
  label,
}));

export const typeOptions = Object.entries(TaskTypeMap).map(([value, label]) => ({
  value,
  label,
}));

export const frequencyOptions = Object.entries(TaskFrequencyMap).map(([value, label]) => ({
  value,
  label,
}));

export const TaskStatusBgClassMap: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "bg-gray-400/10",
  [TaskStatus.IN_PROGRESS]: "bg-yellow-400/10",
  [TaskStatus.COMPLETED]: "bg-green-400/10",
  [TaskStatus.OVERDUE]: "bg-red-400/10",
};

export const TaskStatusTextClassMap: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "text-gray-400",
  [TaskStatus.IN_PROGRESS]: "text-yellow-400",
  [TaskStatus.COMPLETED]: "text-green-400",
  [TaskStatus.OVERDUE]: "text-red-400",
};

export const TaskTypeColorMap: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: "text-blue-400",
  [TaskType.LAUNCH_CAMPAIGN]: "text-green-400",
  [TaskType.NURTURE_ACCOUNT]: "text-fuchsia-400",
  [TaskType.APPEAL_ACCOUNT]: "text-rose-400",
  [TaskType.DOCUMENT_APPEAL]: "text-orange-400",
  [TaskType.RESEARCH]: "text-yellow-400",
};

export const TaskTypeBgColorMap: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: "bg-blue-400",
  [TaskType.LAUNCH_CAMPAIGN]: "bg-green-400",
  [TaskType.NURTURE_ACCOUNT]: "bg-fuchsia-400",
  [TaskType.APPEAL_ACCOUNT]: "bg-rose-400",
  [TaskType.DOCUMENT_APPEAL]: "bg-orange-400",
  [TaskType.RESEARCH]: "bg-yellow-400",
};
