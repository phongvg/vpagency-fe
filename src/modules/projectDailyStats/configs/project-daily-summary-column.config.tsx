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
    meta: {
      sticky: "left",
      stickyOffset: 32,
    },
  },
  {
    header: "Tổng chi tiêu",
    accessorKey: "totalCost",
    cell: (props) => <span className='font-bold text-red-500'>{formatDollarAmount(props.row.original.totalCost)}</span>,
  },
  {
    header: "Tổng lượt click",
    accessorKey: "totalClicks",
    cell: (props) => <span className='font-bold text-blue-500'>{props.row.original.totalClicks}</span>,
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgTargetCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.avgTargetCpc)}</span>,
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          header: "Lợi nhuận",
          accessorKey: "profit",
          cell: (props) => <span className='font-bold text-green-500'>{formatDollarAmount(props.row.original.profit)}</span>,
        },
        {
          header: "ROI (%)",
          accessorKey: "roi",
          cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.roi)}%`}</span>,
        },
        {
          header: "Hoa hồng tạm giữ",
          accessorKey: "holdRevenue",
          cell: (props) => <span className='font-bold text-orange-500'>{formatDollarAmount(props.row.original.holdRevenue)}</span>,
        },
        {
          header: "Hoa hồng rút về",
          accessorKey: "receivedRevenue",
          cell: (props) => <span className='font-bold text-emerald-500'>{formatDollarAmount(props.row.original.receivedRevenue)}</span>,
        },
        {
          header: "Tổng Ref",
          accessorKey: "totalRef",
          cell: (props) => <span className='font-bold text-cyan-500'>{props.row.original.totalRef}</span>,
        },
        {
          header: "Chi phí mỗi Ref",
          accessorKey: "costPerRef",
          cell: (props) => <span className='font-bold text-pink-500'>{formatDollarAmount(props.row.original.costPerRef)}</span>,
        },
        {
          header: "Tỷ lệ Ref/Click (%)",
          accessorKey: "rateRefPerClick",
          cell: (props) => <span className='font-bold text-teal-500'>{`${fixedNumber(props.row.original.rateRefPerClick)}%`}</span>,
        },
        {
          header: "Số FTD",
          accessorKey: "totalFtd",
          cell: (props) => <span className='font-bold text-lime-500'>{props.row.original.totalFtd}</span>,
        },
        {
          header: "Chi phí mỗi FTD",
          accessorKey: "costPerFtd",
          cell: (props) => <span className='font-bold text-rose-500'>{formatDollarAmount(props.row.original.costPerFtd)}</span>,
        },
        {
          header: "Tỷ lệ FTD/Ref (%)",
          accessorKey: "rateFtdPerRef",
          cell: (props) => <span className='font-bold text-violet-500'>{`${fixedNumber(props.row.original.rateFtdPerRef)}%`}</span>,
        },
        {
          header: "Volume key/ngày",
          accessorKey: "totalTargetDailyKeyVolume",
          cell: (props) => <span className='font-bold text-amber-500'>{props.row.original.totalTargetDailyKeyVolume}</span>,
        },
        {
          header: "Dự tính Ref/ngày",
          accessorKey: "totalTargetRef",
          cell: (props) => <span className='font-bold text-indigo-500'>{props.row.original.totalTargetRef}</span>,
        },
        {
          header: "% Click đạt được",
          accessorKey: "clickAchievementRate",
          cell: (props) => <span className='font-bold text-green-600'>{`${fixedNumber(props.row.original.clickAchievementRate)}%`}</span>,
        },
        {
          header: "% Ref đạt được",
          accessorKey: "refAchievementRate",
          cell: (props) => <span className='font-bold text-emerald-600'>{`${fixedNumber(props.row.original.refAchievementRate)}%`}</span>,
        },
      ]
    : []) as ColumnDef<ProjectDailyStatsSummary>[]),
];
