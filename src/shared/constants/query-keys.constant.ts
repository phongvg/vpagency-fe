import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
import type { GmailStatusListParams } from "@/modules/gmailStatus/types/gmailStatus.type";
import type { ProjectListParams } from "@/modules/project/types/project.type";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import type { ProjectStatusListParams } from "@/modules/projectStatus/types/projectStatus.type";
import type { ProjectTypeListParams } from "@/modules/projectType/types/projectType.type";
import type { TaskListParams } from "@/modules/task/types/task.type";
import type { UserListParams } from "@/modules/user/types/user.type";
import { normalizeParams } from "@/shared/utils/common.util";

export const taskQueryKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskQueryKeys.all, "list"] as const,

  list: (params: TaskListParams) => [...taskQueryKeys.lists(), normalizeParams(params)] as const,

  byStatus: () => [...taskQueryKeys.all, "by-status"] as const,

  detail: (id: string) => [...taskQueryKeys.all, "detail", id] as const,

  progress: (id: string) => [...taskQueryKeys.all, "progress", id] as const,

  campaignStatsFinalUrl: (taskId: string, finalUrlId: string, params: CampaignListParams) =>
    [...taskQueryKeys.all, "campaign-stats", taskId, finalUrlId, normalizeParams(params)] as const,
};

export const finalUrlQueryKeys = {
  all: ["final-urls"] as const,

  lists: () => [...finalUrlQueryKeys.all, "list"] as const,

  listByProject: (projectId: string) => [...finalUrlQueryKeys.lists(), "by-project", projectId] as const,

  detail: (id: string) => [...finalUrlQueryKeys.all, "detail", id] as const,
};

export const campaignQueryKeys = {
  all: ["campaigns"] as const,

  lists: () => [...campaignQueryKeys.all, "list"] as const,

  list: (params: CampaignListParams) => [...campaignQueryKeys.lists(), normalizeParams(params)] as const,
};

export const userQueryKeys = {
  all: ["users"] as const,

  lists: () => [...userQueryKeys.all, "list"] as const,

  list: (params: UserListParams) => [...userQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...userQueryKeys.all, "detail", id] as const,
};

export const gmailQueryKeys = {
  all: ["gmails"] as const,

  lists: () => [...gmailQueryKeys.all, "list"] as const,

  list: (params: GmailListParams) => [...gmailQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...gmailQueryKeys.all, "detail", id] as const,
};

export const projectQueryKeys = {
  all: ["projects"] as const,

  lists: () => [...projectQueryKeys.all, "list"] as const,

  list: (params: ProjectListParams) => [...projectQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...projectQueryKeys.all, "detail", id] as const,
};

export const projectStatusQueryKeys = {
  all: ["project-statuses"] as const,

  lists: () => [...projectStatusQueryKeys.all, "list"] as const,

  list: (params: ProjectStatusListParams) => [...projectStatusQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...projectStatusQueryKeys.all, "detail", id] as const,
};

export const projectTypeQueryKeys = {
  all: ["project-types"] as const,

  lists: () => [...projectTypeQueryKeys.all, "list"] as const,

  list: (params: ProjectTypeListParams) => [...projectTypeQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...projectTypeQueryKeys.all, "detail", id] as const,
};

export const gmailStatusQueryKeys = {
  all: ["gmail-statuses"] as const,

  lists: () => [...gmailStatusQueryKeys.all, "list"] as const,

  list: (params: GmailStatusListParams) => [...gmailStatusQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...gmailStatusQueryKeys.all, "detail", id] as const,
};

export const appealAccountQueryKeys = {
  all: ["appeal-accounts"] as const,

  lists: () => [...appealAccountQueryKeys.all, "list"] as const,

  list: (params: AppealAccountListParams) => [...appealAccountQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...appealAccountQueryKeys.all, "detail", id] as const,
};

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  userStats: () => [...dashboardQueryKeys.all, "user-stats"] as const,

  taskStats: () => [...dashboardQueryKeys.all, "task-stats"] as const,
};

export const projectDailyStatsQueryKeys = {
  all: ["project-daily-stats"] as const,

  lists: () => [...projectDailyStatsQueryKeys.all, "list"] as const,

  list: (params: ProjectDailyStatsListParams) => [...projectDailyStatsQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...projectDailyStatsQueryKeys.all, "detail", id] as const,
};
