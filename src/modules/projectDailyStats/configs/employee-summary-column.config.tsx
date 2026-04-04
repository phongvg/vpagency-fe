import type { Employee } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import UserAvatar from "@/shared/components/UserAvatar";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";

export const employeeSummaryColumnConfig = (): ColumnDef<Employee>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Nhân viên",
    accessorKey: "username",
    minSize: 180,
    cell: (props) => {
      const { avatar, firstName, lastName, username } = props.row.original;
      return <UserAvatar data={{ avatar, firstName, lastName, username }} />;
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
    header: "Tổng hiển thị",
    accessorKey: "totalImpression",
    cell: (props) => <span className='font-bold text-yellow-500'>{props.row.original.totalImpression}</span>,
  },
  {
    header: "CPC trung bình",
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
    header: "Ngày hoạt động",
    accessorKey: "activeDays",
    cell: (props) => <span className='font-bold text-amber-500'>{props.row.original.activeDays}</span>,
  },
];
