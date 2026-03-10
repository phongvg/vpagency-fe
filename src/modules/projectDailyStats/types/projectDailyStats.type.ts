import type { LocationStat } from "@/modules/campaign/types/campaign.type";
import type { ApiBaseListResponse } from "@/shared/types/common/apiResponse.type";
import type { BaseParams } from "@/shared/types/common/param.type";

export type ProjectDailyStatsListParams = BaseParams & {
  fromDate?: string;
  toDate?: string;
  projectName?: string;
  typeId?: string;
};

export type FinalUrlDailyStatsListParams = ProjectDailyStatsListParams;

export type ProjectDailyStatsResponse = ApiBaseListResponse<
  ProjectDailyStats,
  {
    summary: ProjectDailyStatsSummary[];
  }
>;

export type ProjectDailyStats = {
  id: string;
  projectId: string;
  projectName: string;
  projectType: string;
  projectStatus: string;
  status: "COMPLETED" | "PENDING";
  date: Date;
  totalClicks: number;
  totalCost: number;
  totalTargetCpc: number;
  activeCountries: LocationStat[];
  createdAt: Date;
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

export type ProjectDailyStatsSummary = {
  projectId: string;
  projectName: string;
  projectStatus: string;
  totalCost: number;
  totalClicks: number;
  avgTargetCpc: number;
  activeCountries: string[];
  profit: number;
  roi: number;
  holdRevenue: number;
  receivedRevenue: number;
  totalRef: number;
  costPerRef: number;
  rateRefPerClick: number;
  totalFtd: number;
  costPerFtd: number;
  rateFtdPerRef: number;
  totalTargetDailyKeyVolume: number;
  totalTargetRef: number;
  clickAchievementRate: number;
  refAchievementRate: number;
};

export type FinalUrlDailyStatsResponse = ApiBaseListResponse<
  FinalUrlDailyStats,
  {
    summary: FinalUrlDailyStatsSummary[];
  }
>;

export type FinalUrlDailyStats = {
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

export type FinalUrlDailyStatsSummary = {
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
