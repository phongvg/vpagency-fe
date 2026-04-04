import type { BaseParams } from "@/shared/types/common/param.type";

export type ProjectDailyStatsListParams = BaseParams & {
  fromDate?: string;
  toDate?: string;
  projectName?: string;
  typeId?: string;
};

export type FinalUrlDailyStatsListParams = ProjectDailyStatsListParams;

export const ProjectDailyStatsStatus = {
  Completed: "COMPLETED",
  Pending: "PENDING",
} as const;

export type ProjectDailyStatsStatus = (typeof ProjectDailyStatsStatus)[keyof typeof ProjectDailyStatsStatus];

export type ProjectDailyStats = {
  id: string;
  projectId: string;
  date: Date;
  status: ProjectDailyStatsStatus;
  totalClicks: number;
  totalCost: number;
  totalTargetCpc: number;
  activeCountries: string[];
  createdAt: Date;
  projectName: string;
  projectStatus: string;
  projectType: string;
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
  projectType: string;
  totalCost: number;
  totalClicks: number;
  avgTargetCpc: number;
  activeCountries: string[];
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
  profit: number;
  roi: number;
  holdRevenue: number;
  receivedRevenue: number;
  finalUrls: FinalURL[];
};

export type FinalURL = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  projectId: string;
  projectName: string;
  targetRef: number;
  targetCostPerRef: number;
  targetFtd: number;
  targetCostPerFtd: number;
  targetDailyKeyVolume: number;
  targetCpc: number;
  budget: number;
  suggestedBid: number;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
  ctr: number;
  campaignCount: number;
  employeeCount: number;
  activeDays: number;
  gmails: string[];
  uids: string[];
  employees: Employee[];
};

export type Employee = {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  roles: string[];
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
  ctr: number;
  campaignCount: number;
  activeDays: number;
  latestImportAt: Date;
  gmails: string[];
  uids: string[];
  campaigns?: FinalUrlEmployeeCampaignStat[];
};

export type FinalUrlEmployeeCampaignStat = {
  campaignId: string;
  campaignName: string;
  externalId: string;
  uid: string;
  gmail: string | null;
  status: string | null;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
  ctr: number;
  activeDays: number;
  latestImportAt: Date | null;
};

export type FinalUrlDailyStats = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  projectId: string;
  projectName: string;
  targetRef: number;
  targetCostPerRef: number;
  targetFtd: number;
  targetCostPerFtd: number;
  targetDailyKeyVolume: number;
  targetCpc: number;
  budget: number;
  suggestedBid: number;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
  ctr: number;
  campaignCount: number;
  employeeCount: number;
  activeDays: number;
  gmails: string[];
  uids: string[];
  employees: Employee[];
};

export type FinalUrlDailyStatsSummary = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  projectId: string;
  projectName: string;
  targetRef: number;
  targetCostPerRef: number;
  targetFtd: number;
  targetCostPerFtd: number;
  targetDailyKeyVolume: number;
  targetCpc: number;
  budget: number;
  suggestedBid: number;
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
  ctr: number;
  campaignCount: number;
  employeeCount: number;
  activeDays: number;
  gmails: string[];
  uids: string[];
  employees: Employee[];
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
