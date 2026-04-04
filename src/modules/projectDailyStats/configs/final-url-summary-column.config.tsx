import type { FinalURL } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";

export const finalUrlSummaryColumnConfig = (): ColumnDef<FinalURL>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên URL",
    accessorKey: "finalUrlName",
    minSize: 140,
  },
  {
    header: "URL",
    accessorKey: "finalURL",
    minSize: 220,
    cell: (props) => (
      <a
        href={props.row.original.finalURL}
        target='_blank'
        rel='noopener noreferrer'
        title={props.row.original.finalURL}
        className='block max-w-xs text-blue-400 underline truncate'>
        {props.row.original.finalURL}
      </a>
    ),
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
    header: "Tổng hiển thị",
    accessorKey: "totalImpression",
    cell: (props) => <span className='font-bold text-yellow-500'>{props.row.original.totalImpression}</span>,
  },
  {
    header: "CPC TB",
    accessorKey: "avgCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.avgCpc)}</span>,
  },
  {
    header: "CTR (%)",
    accessorKey: "ctr",
    cell: (props) => <span className='font-bold text-teal-500'>{`${fixedNumber(props.row.original.ctr)}%`}</span>,
  },
  {
    header: "Số chiến dịch",
    accessorKey: "campaignCount",
    cell: (props) => <span className='font-bold text-indigo-500'>{props.row.original.campaignCount}</span>,
  },
  {
    header: "Số nhân viên",
    accessorKey: "employeeCount",
    cell: (props) => <span className='font-bold text-cyan-500'>{props.row.original.employeeCount}</span>,
  },
  {
    header: "Ngày hoạt động",
    accessorKey: "activeDays",
    cell: (props) => <span className='font-bold text-amber-500'>{props.row.original.activeDays}</span>,
  },
];
