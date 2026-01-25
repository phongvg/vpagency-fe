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
