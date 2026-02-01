import type { FinalUrl, FinalURLGroup } from "@/modules/finalUrl/types/finalUrl.type";
import type { Project } from "@/modules/project/types/project.type";
import type { User } from "@/modules/user/types/user.type";
import type { BaseParam } from "@/shared/types/common/param.type";

export const TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskType = {
  SET_CAMPAIGN: "SET_CAMPAIGN",
  LAUNCH_CAMPAIGN: "LAUNCH_CAMPAIGN",
  NURTURE_ACCOUNT: "NURTURE_ACCOUNT",
  APPEAL_ACCOUNT: "APPEAL_ACCOUNT", // Kháng tài khoản
  DOCUMENT_APPEAL: "DOCUMENT_APPEAL", // Kháng giấy
  RESEARCH: "RESEARCH", // Nghiên cứu
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType];

export const TaskFrequency = {
  DAILY: "DAILY",
  ONCE: "ONCE",
};

export type TaskFrequency = (typeof TaskFrequency)[keyof typeof TaskFrequency];

export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
};

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export type TaskListParams = BaseParam & {
  search?: string;
  status?: TaskStatus;
  type?: TaskType;
  priority?: TaskPriority;
  assignedUserId?: string;
  creatorId?: string;
  projectId?: string;
  fromDate?: string;
  toDate?: string;
};

export type Task = {
  id: string;
  name: string;
  type: TaskType;
  frequency: TaskFrequency;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  note: string | null;
  deadline: Date;
  projectId: string;
  projectIds: string[];
  projects?: Project[];
  adsGroupId: string | null;
  numberOfCampaigns: number | null;
  numberOfBackupCampaigns: number;
  dailyBudget: number;
  numberOfAccounts: number | null;
  assignedUsers: User[];
  creatorId: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
  numberOfResultCampaigns: number | null;
  numberOfSuspendedAccounts: number | null;
  appealProject: string | null;
  numberOfAppealDocuments: number | null;
  researchContent: string | null;
  finalUrlIds: string[];
  finalUrls: FinalUrl[];
  gmailIds: string[];
  totalCost: number;
  avgCpc: number;

  project: Project;

  appealDetails?: TaskAppealDetail[];
  appealSummary?: TaskAppealSummary;
  documentAppealDetails?: TaskDocumentAppealDetail[];
  documentAppealSummary?: TaskDocumentAppealSummary;
  researchDetails?: TaskResearchDetail[];
};

export type TasksGroupedByStatus = {
  PENDING: Task[];
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
  CANCELLED: Task[];
};

export type TaskAppealDetail = {
  appealDate: string;
  suspensionReason: string;
  appealCount: number;
  successCount: number;
  failureCount: number;
  successRate: number;
};

export type TaskAppealSummary = {
  totalAppealCount: number;
  totalSuccessCount: number;
  totalFailureCount: number;
  overallSuccessRate: number;
};

export type TaskDocumentAppealDetail = {
  id: string;
  creator: User;
  appealDate: string;
  projectId: string;
  projectName: string;
  appealCount: number;
  successCount: number;
  note: string | null;
  successRate: number;
};

export type TaskDocumentAppealSummary = {
  totalAppealCount: number;
  totalSuccessCount: number;
  totalFailureCount: number;
  overallSuccessRate: number;
};

export type TaskResearchDetail = {
  id: string;
  creator: User;
  resultDate: string;
  result: string;
  difficultyLevel: string;
};

export type UpdateTaskRequest = {
  name?: string;
  type?: TaskType | null;
  frequency?: TaskFrequency | null;
  priority?: TaskPriority | null;
  deadline?: Date | null;
  assignedUserIds?: string[];
  projectId?: string | null;
  projectIds?: string[];
  note?: string;
  numberOfCampaigns?: number;
  numberOfBackupCampaigns?: number;
  dailyBudget?: number;
  numberOfAccounts?: number;
  numberOfResultCampaigns?: number;
  finalUrlIds?: string[];
  numberOfSuspendedAccounts?: number;
  numberOfAppealDocuments?: number;
  researchContent?: string;
};

export type TaskProgress = {
  id: string;
  name: string;
  projectId: string;
  progress: number;
  totalFinalUrls: number;
  finalUrls: FinalURLGroup[];
};
