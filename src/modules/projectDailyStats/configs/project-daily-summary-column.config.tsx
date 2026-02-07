import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import type { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import type { ColumnDef } from "@tanstack/react-table";

export const projectDailySummaryColumnConfig = (roles: Role[] | undefined): ColumnDef<ProjectDailyStatsSummary>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên dự án",
    accessorKey: "projectName",
    minSize: 180,
  },
  {
    header: "Tổng chi tiêu",
    accessorKey: "totalCost",
    cell: (props) => formatDollarAmount(props.row.original.totalCost),
  },
  {
    header: "Tổng lượt click",
    accessorKey: "totalClicks",
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgTargetCpc",
    cell: (props) => formatDollarAmount(props.row.original.avgTargetCpc),
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          header: "Lợi nhuận",
          accessorKey: "profit",
          cell: (props) => formatDollarAmount(props.row.original.profit),
        },
        {
          header: "ROI (%)",
          accessorKey: "roi",
          cell: (props) => `${fixedNumber(props.row.original.roi)}%`,
        },
        {
          header: "Hoa hồng tạm giữ",
          accessorKey: "holdRevenue",
          cell: (props) => formatDollarAmount(props.row.original.holdRevenue),
        },
        {
          header: "Hoa hồng rút về",
          accessorKey: "receivedRevenue",
          cell: (props) => formatDollarAmount(props.row.original.receivedRevenue),
        },
        {
          header: "Tổng Ref",
          accessorKey: "totalRef",
        },
        {
          header: "Chi phí mỗi Ref",
          accessorKey: "costPerRef",
          cell: (props) => formatDollarAmount(props.row.original.costPerRef),
        },
        {
          header: "Tỷ lệ Ref/Click (%)",
          accessorKey: "rateRefPerClick",
          cell: (props) => `${fixedNumber(props.row.original.rateRefPerClick)}%`,
        },
        {
          header: "Số FTD",
          accessorKey: "totalFtd",
        },
        {
          header: "Chi phí mỗi FTD",
          accessorKey: "costPerFtd",
          cell: (props) => formatDollarAmount(props.row.original.costPerFtd),
        },
        {
          header: "Tỷ lệ FTD/Ref (%)",
          accessorKey: "rateFtdPerRef",
          cell: (props) => `${fixedNumber(props.row.original.rateFtdPerRef)}%`,
        },
        {
          header: "Volume key/ngày",
          accessorKey: "totalTargetDailyKeyVolume",
        },
        {
          header: "Dự tính Ref/ngày",
          accessorKey: "totalTargetRef",
        },
        {
          header: "% Click đạt được",
          accessorKey: "clickAchievementRate",
          cell: (props) => `${fixedNumber(props.row.original.clickAchievementRate)}%`,
        },
        {
          header: "% Ref đạt được",
          accessorKey: "refAchievementRate",
          cell: (props) => `${fixedNumber(props.row.original.refAchievementRate)}%`,
        },
      ]
    : []) as ColumnDef<ProjectDailyStatsSummary>[]),
];
