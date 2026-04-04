import type { MetricCardConfig } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { Activity, Briefcase, DollarSign, Eye, MousePointerClick, Percent, Target, TrendingUp, Wallet } from "lucide-react";

export const finalUrlDailyMetricsConfig: MetricCardConfig[] = [
  {
    key: "totalCost",
    label: "Tổng chi tiêu",
    format: (v) => formatDollarAmount(v),
    icon: DollarSign,
    color: "text-red-800",
  },
  {
    key: "totalBudget",
    label: "Tổng ngân sách",
    format: (v) => formatDollarAmount(v),
    icon: Wallet,
    color: "text-orange-400",
  },
  {
    key: "totalClicks",
    label: "Tổng lượt click",
    icon: MousePointerClick,
    color: "text-blue-500",
  },
  {
    key: "totalImpression",
    label: "Tổng lượt hiển thị",
    icon: Eye,
    color: "text-yellow-500",
  },
  {
    key: "avgCpc",
    label: "CPC trung bình",
    format: (v) => formatDollarAmount(v),
    icon: TrendingUp,
    color: "text-purple-800",
  },
  {
    key: "avgCtr",
    label: "CTR trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    icon: Percent,
    color: "text-pink-400",
  },
  {
    key: "totalTargetDailyKeyVolume",
    label: "Tổng mục tiêu key volume",
    icon: Activity,
    color: "text-teal-400",
  },
  {
    key: "totalTargetRef",
    label: "Tổng mục tiêu Ref",
    icon: Target,
    color: "text-emerald-400",
  },
  {
    key: "totalCampaignCount",
    label: "Tổng chiến dịch",
    icon: Briefcase,
    color: "text-indigo-400",
  },
];
