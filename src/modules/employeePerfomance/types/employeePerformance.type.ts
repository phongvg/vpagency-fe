import type { BaseParams } from "@/shared/types/common/param.type";

export type EmployeePerformanceParams = BaseParams & {
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  projectTypeId?: string;
};

export type EmployeePerformance = {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  cost: number;
  cpc: number;
  clicks: number;
  impressions: number;
  ctr: number;
  ref: number;
  ftd: number;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksFailed: number;
  tasksCompletionRate: number;
  projectsAssigned: number;
  projectsProfitable: number;
  projectsProfitRate: number;
  linksAssigned: number;
  linksProfitable: number;
  linksProfitRate: number;
  holdRevenue: number;
  receivedRevenue: number;
  profit: number;
  roi: number;
};

export type EmployeeRanking = {
  byCost: By[];
  byRef: By[];
  byActiveProjects: By[];
};

export type By = {
  rank: number;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  value: number;
};

export type EmployeeProject = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  projects: EmployeeProjectItem[];
};

export type EmployeeProjectItem = {
  projectId: string;
  projectName: string;
  cost: number;
  cpc: number;
  clicks: number;
  impressions: number;
  ctr: number;
  ref: number;
  ftd: number;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksFailed: number;
  tasksCompletionRate: number;
  linksAssigned: number;
  linksProfitable: number;
  linksProfitRate: number;
  holdRevenue?: number;
  receivedRevenue?: number;
  profit?: number;
  roi?: number;
};
