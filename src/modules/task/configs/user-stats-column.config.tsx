import type { UserStats } from "@/modules/task/types/task.type";
import { formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";

export const userStatsColumns: ColumnDef<UserStats>[] = [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên đăng nhập",
    accessorKey: "username",
  },
  {
    header: "Họ và tên",
    accessorKey: "fullName",
    cell: (props) => `${props.row.original.firstName} ${props.row.original.lastName}`,
  },
  {
    header: "Tổng lượt click",
    accessorKey: "totalClicks",
  },
  {
    header: "Tổng chi tiêu",
    accessorKey: "totalCost",
    cell: (props) => formatDollarAmount(props.row.original.totalCost),
  },
  {
    header: "Tổng lượt hiển thị",
    accessorKey: "totalImpression",
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgCpc",
    cell: (props) => formatDollarAmount(props.row.original.avgCpc),
  },
  {
    header: "Tổng chiến dịch",
    accessorKey: "campaignCount",
  },
];
