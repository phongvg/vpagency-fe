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
  [TaskStatus.CANCELLED]: "Đã hủy",
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
  [TaskStatus.PENDING]: "bg-gray-50",
  [TaskStatus.IN_PROGRESS]: "bg-blue-50",
  [TaskStatus.COMPLETED]: "bg-green-50",
  [TaskStatus.CANCELLED]: "bg-red-50",
};

export const TaskStatusTextClassMap: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "text-gray-700",
  [TaskStatus.IN_PROGRESS]: "text-blue-700",
  [TaskStatus.COMPLETED]: "text-green-700",
  [TaskStatus.CANCELLED]: "text-red-700",
};

export const TaskTypeColorMap: Record<TaskType, string> = {
  [TaskType.SET_CAMPAIGN]: "text-rose-400",
  [TaskType.LAUNCH_CAMPAIGN]: "text-green-600",
  [TaskType.NURTURE_ACCOUNT]: "text-fuchsia-300",
  [TaskType.APPEAL_ACCOUNT]: "text-red-600",
  [TaskType.DOCUMENT_APPEAL]: "text-orange-600",
  [TaskType.RESEARCH]: "text-yellow-600",
};
