import type { TaskFormType } from "@/modules/task/schemas/task-form.schema";
import type { Task, UpdateTaskRequest } from "@/modules/task/types/task.type";

export const transformTaskToForm = (data?: Task | undefined): TaskFormType => ({
  name: data?.name ?? "",
  type: data?.type ?? "",
  frequency: data?.frequency ?? "",
  priority: data?.priority ?? "",
  deadline: data?.deadline ? new Date(data.deadline) : new Date(),
  projectId: data?.project ? { value: data.project.id, label: data.project.name } : null,
  assignedUserIds: data?.assignedUsers?.map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` })) ?? [],
  note: data?.note ?? "",
  finalUrlIds: data?.finalUrls?.map((url) => url.id) ?? [],
  dailyBudget: data?.dailyBudget ?? undefined,
  numberOfAccounts: data?.numberOfAccounts ?? undefined,
  numberOfResultCampaigns: data?.numberOfResultCampaigns ?? undefined,
  numberOfSuspendedAccounts: data?.numberOfSuspendedAccounts ?? undefined,
  numberOfAppealDocuments: data?.numberOfAppealDocuments ?? undefined,
  researchContent: data?.researchContent ?? undefined,
  projectIds: data?.projects?.map((project) => project.id) ?? undefined,
});

export const transformTaskFormToPayload = (data: TaskFormType): UpdateTaskRequest => ({
  name: data.name,
  type: data.type,
  frequency: data.frequency,
  priority: data.priority,
  deadline: data.deadline,
  projectId: data.projectId ? data.projectId.value : null,
  assignedUserIds: data.assignedUserIds.map((user) => user.value),
  note: data.note,
  finalUrlIds: data.finalUrlIds,
  dailyBudget: data.dailyBudget,
  numberOfAccounts: data.numberOfAccounts,
  numberOfResultCampaigns: data.numberOfResultCampaigns,
  numberOfSuspendedAccounts: data.numberOfSuspendedAccounts,
  numberOfAppealDocuments: data.numberOfAppealDocuments,
  researchContent: data.researchContent,
  projectIds: data.projectIds,
});
