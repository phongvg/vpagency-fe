import type { MetricCardConfig } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";

export const projectDailyMetricsConfig: MetricCardConfig[] = [
  {
    key: "totalCost",
    label: "Tổng chi tiêu",
    format: (v) => formatDollarAmount(v),
  },
  {
    key: "totalClicks",
    label: "Tổng lượt click",
  },
  {
    key: "avgCpc",
    label: "CPC trung bình",
    format: (v) => formatDollarAmount(v),
  },
  {
    key: "totalProfit",
    label: "Lợi nhuận",
    format: (v) => formatDollarAmount(v),
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgRoi",
    label: "ROI trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalHoldRevenue",
    label: "Hoa hồng tạm giữ",
    format: (v) => formatDollarAmount(v),
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalReceivedRevenue",
    label: "Hoa hồng rút về",
    format: (v) => formatDollarAmount(v),
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalRef",
    label: "Tổng Ref",
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgCostPerRef",
    label: "Chi phí trung bình/Ref",
    format: (v) => formatDollarAmount(v),
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgRateRefPerClick",
    label: "Tỷ lệ Ref/Click trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalFtd",
    label: "Tổng FTD",
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgCostPerFtd",
    label: "Chi phí trung bình/FTD",
    format: (v) => formatDollarAmount(v),
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgRateFtdPerRef",
    label: "Tỷ lệ FTD/Ref trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalTargetDailyKeyVolume",
    label: "Volume key/ngày ",
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "totalTargetRef",
    label: "Tổng mục tiêu Ref",
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgClickAchievementRate",
    label: "Tỷ lệ hoàn thành Click trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
  {
    key: "avgRefAchievementRate",
    label: "Tỷ lệ hoàn thành Ref trung bình",
    format: (v) => `${fixedNumber(v)}%`,
    allowedRoles: [Role.ADMIN, Role.ACCOUNTING],
  },
];
