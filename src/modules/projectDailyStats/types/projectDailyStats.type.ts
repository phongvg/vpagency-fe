import type { ApiBaseListResponse } from "@/shared/types/common/apiResponse.type";
import type { BaseParams } from "@/shared/types/common/param.type";

export type ProjectDailyStatsListParams = BaseParams & {
  fromDate?: string;
  toDate?: string;
  projectName?: string;
};

export type ProjectDailyStatsResponse = ApiBaseListResponse<
  ProjectDailyStats,
  {
    summary: ProjectDailyStatsSummary[];
  }
>;

export type ProjectDailyStats = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  projectId: string;
  projectName: string;
  date: string;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
};

export type ProjectDailyStatsSummary = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  projectId: string;
  projectName: string;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
};

export type GenerateProjectDailyStatRequest = {
  projectId: string;
  date: string;
};

export type UpdateProjectDailyStatRequest = {
  totalRef: number;
  costPerRef: number;
  rateRefPerClick: number;
  totalFtd: number;
  costPerFtd: number;
  costFtdPerRef: number;
  totalTargetDailyKeyVolume: number;
  totalTargetRef: number;
  totalClickPerVolume: number;
  totalRefPerVolume: number;
  receivedRevenue: number;
  holdRevenue: number;
  profit: number;
  roi: number;
};
