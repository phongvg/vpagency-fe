export type AggregatedMetrics = {
  totalClicks: number;
  totalCost: number;
  totalImpression: number;
  avgCpc: number;
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
