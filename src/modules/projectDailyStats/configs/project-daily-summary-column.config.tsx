import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import type { Role } from "@/shared/constants/role.constant";
import { formatDollarAmount } from "@/shared/utils/common.util";
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
    // meta: {
    //   sticky: "left",
    //   stickyOffset: 32,
    // },
  },
  {
    header: "Tên URL",
    accessorKey: "finalUrlName",
    cell: (props) => props.row.original.finalUrlName,
  },
  {
    header: "URL",
    accessorKey: "finalURL",
    cell: (props) => (
      <a
        href={props.row.original.finalURL}
        target='_blank'
        rel='noopener noreferrer'
        title={props.row.original.finalURL}
        className='block max-w-xs text-blue-500 underline truncate'>
        {props.row.original.finalURL}
      </a>
    ),
  },
  {
    header: "Tổng chi tiêu",
    accessorKey: "totalCost",
    cell: (props) => <span className='font-bold text-red-500 ml-20px'>{formatDollarAmount(props.row.original.totalCost)}</span>,
  },
  {
    header: "Tổng lượt click",
    accessorKey: "totalClicks",
    cell: (props) => <span className='font-bold text-blue-500'>{props.row.original.totalClicks}</span>,
  },
  {
    header: "Tổng lượt hiển thị",
    accessorKey: "totalImpression",
    cell: (props) => <span className='font-bold text-yellow-500'>{props.row.original.totalImpression}</span>,
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.avgCpc)}</span>,
  },
  // ...((isAdminOrAccounting(roles)
  //   ? [
  //       {
  //         header: "Lợi nhuận",
  //         accessorKey: "profit",
  //         cell: (props) => <span className='font-bold text-green-500'>{formatDollarAmount(props.row.original.profit)}</span>,
  //       },
  //       {
  //         header: "ROI (%)",
  //         accessorKey: "roi",
  //         cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.roi)}%`}</span>,
  //       },
  //       {
  //         header: "Hoa hồng tạm giữ",
  //         accessorKey: "holdRevenue",
  //         cell: (props) => <span className='font-bold text-orange-500'>{formatDollarAmount(props.row.original.holdRevenue)}</span>,
  //       },
  //       {
  //         header: "Hoa hồng rút về",
  //         accessorKey: "receivedRevenue",
  //         cell: (props) => <span className='font-bold text-emerald-500'>{formatDollarAmount(props.row.original.receivedRevenue)}</span>,
  //       },
  //     ]
  //   : []) as ColumnDef<ProjectDailyStatsSummary>[]),
];
