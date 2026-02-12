export type AggregatedMetrics = {
  totalCost: number;
  totalClicks: number;
  avgCpc: number;
  totalProfit: number;
  avgRoi: number;
  totalHoldRevenue: number;
  totalReceivedRevenue: number;
  totalRef: number;
  avgCostPerRef: number;
  avgRateRefPerClick: number;
  totalFtd: number;
  avgCostPerFtd: number;
  avgRateFtdPerRef: number;
  totalTargetDailyKeyVolume: number;
  totalTargetRef: number;
  avgClickAchievementRate: number;
  avgRefAchievementRate: number;
};

type MetricKey = keyof AggregatedMetrics;

import type { Role } from "@/shared/constants/role.constant";
import type { LucideIcon } from "lucide-react";

export type MetricCardConfig = {
  key: MetricKey;
  label: string;
  format?: (value: number) => string;
  allowedRoles?: Role[];
  icon: LucideIcon;
  color: string;
};
