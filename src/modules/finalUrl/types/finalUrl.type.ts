import type { Project } from "@/modules/project/types/project.type";

export type FinalUrl = {
  id: string;
  name: string;
  finalURL: string;
  countriesTier1: string[];
  countriesTier2: string[];
  countriesTier3: string[];
  excludeCountries: string[];
  projectId: string;
  title: string | null;
  content: string | null;
  targetRef: number | null;
  targetCostPerRef: number | null;
  targetFtd: number | null;
  targetCostPerFtd: number | null;
  targetDailyKeyVolume: number | null;
  targetCpc: number | null;
  budget: number | null;
  suggestedBid: number | null;
  totalClicks: number;
  totalSpent: number;
  totalRef: number;
  totalFtd: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  project: Project;
};

export type FinalURLGroup = {
  finalUrlId: string;
  finalUrlName: string;
  finalURL: string;
  totalCampaignDailyStats: number;
};

export type UpdateFinalUrlRequest = {
  projectId: string;
  name?: string;
  finalURL?: string;
  countriesTier1?: string[];
  countriesTier2?: string[];
  countriesTier3?: string[];
  excludeCountries?: string[];
  title?: string | null;
  content?: string | null;
  targetRef?: number | null;
  targetCostPerRef?: number | null;
  targetFtd?: number | null;
  targetCostPerFtd?: number | null;
  targetDailyKeyVolume?: number | null;
  targetCpc?: number | null;
  budget?: number | null;
  suggestedBid?: number | null;
};
