import type { TaskFormType } from "@/modules/task/schemas/task-form.schema";
import type { Task } from "@/modules/task/types/task.type";

export const transformTaskToForm = (data?: Task | undefined): TaskFormType => ({
  name: data?.name ?? "",
  type: data?.type ?? "",
  frequency: data?.frequency ?? "",
  priority: data?.priority ?? "",
  deadline: data?.deadline ?? new Date(),
  projectId: data?.project?.id ?? null,
  assignedUserIds: data?.assignedUsers?.map((user) => user.id) ?? [],
  finalUrlIds: data?.finalUrls?.map((url) => url.id) ?? [],
  dailyBudget: data?.dailyBudget ?? undefined,
  numberOfAccounts: data?.numberOfAccounts ?? undefined,
  numberOfResultCampaigns: data?.numberOfResultCampaigns ?? undefined,
  numberOfSuspendedAccounts: data?.numberOfSuspendedAccounts ?? undefined,
  numberOfAppealDocuments: data?.numberOfAppealDocuments ?? undefined,
  researchContent: data?.researchContent ?? undefined,
  projectIds: data?.projects?.map((project) => project.id) ?? undefined,
});
