import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
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
