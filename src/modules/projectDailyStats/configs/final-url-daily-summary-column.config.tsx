import type { FinalUrlDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";

export const finalUrlDailySummaryColumnConfig = (): ColumnDef<FinalUrlDailyStatsSummary>[] => [
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
    header: "Ngân sách",
    accessorKey: "budget",
    cell: (props) => <span className='font-bold text-orange-400'>{formatDollarAmount(props.row.original.budget)}</span>,
  },
  {
    header: "Thầu đề xuất",
    accessorKey: "suggestedBid",
    cell: (props) => <span className='font-bold text-cyan-500'>{formatDollarAmount(props.row.original.suggestedBid)}</span>,
  },
  {
    header: "Mục tiêu CPC",
    accessorKey: "targetCpc",
    cell: (props) => <span className='font-bold text-indigo-400'>{formatDollarAmount(props.row.original.targetCpc)}</span>,
  },
  {
    header: "Mục tiêu Key Volume/ngày",
    accessorKey: "targetDailyKeyVolume",
    cell: (props) => <span className='font-bold text-teal-400'>{props.row.original.targetDailyKeyVolume}</span>,
  },
  {
    header: "Mục tiêu Ref",
    accessorKey: "targetRef",
    cell: (props) => <span className='font-bold text-emerald-400'>{props.row.original.targetRef}</span>,
  },
  {
    header: "Mục tiêu Cost/Ref",
    accessorKey: "targetCostPerRef",
    cell: (props) => <span className='font-bold text-lime-400'>{formatDollarAmount(props.row.original.targetCostPerRef)}</span>,
  },
  {
    header: "Mục tiêu FTD",
    accessorKey: "targetFtd",
    cell: (props) => <span className='font-bold text-sky-400'>{props.row.original.targetFtd}</span>,
  },
  {
    header: "Mục tiêu Cost/FTD",
    accessorKey: "targetCostPerFtd",
    cell: (props) => <span className='font-bold text-violet-400'>{formatDollarAmount(props.row.original.targetCostPerFtd)}</span>,
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
    header: "Tổng lượt hiển thị",
    accessorKey: "totalImpression",
    cell: (props) => <span className='font-bold text-yellow-500'>{props.row.original.totalImpression}</span>,
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.avgCpc)}</span>,
  },
  {
    header: "CTR",
    accessorKey: "ctr",
    cell: (props) => <span className='font-bold text-pink-400'>{props.row.original.ctr?.toFixed(2)}%</span>,
  },
  {
    header: "Số chiến dịch",
    accessorKey: "campaignCount",
    cell: (props) => <span className='font-bold'>{props.row.original.campaignCount}</span>,
  },
  {
    header: "Số nhân viên",
    accessorKey: "employeeCount",
    cell: (props) => <span className='font-bold'>{props.row.original.employeeCount}</span>,
  },
  {
    header: "Ngày hoạt động",
    accessorKey: "activeDays",
    cell: (props) => <span className='font-bold'>{props.row.original.activeDays}</span>,
  },
];
