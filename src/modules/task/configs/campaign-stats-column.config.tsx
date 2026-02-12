import type { CampaignStats } from "@/modules/task/types/task.type";
import { addDash, fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const campaignStatsColumnConfig: ColumnDef<CampaignStats>[] = [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "UID",
    accessorKey: "uid",
    cell: (props) => <span className='whitespace-nowrap'>{addDash(props.row.original.uid)}</span>,
  },
  {
    header: "Chiến dịch",
    accessorKey: "campaignName",
  },
  {
    header: "ID chiến dịch",
    accessorKey: "externalId",
  },
  {
    header: "Người phụ trách (Tên đăng nhập)",
    accessorKey: "ownerUsername",
  },
  {
    header: "Gmail",
    accessorKey: "gmail",
  },
  {
    header: "Ngày dữ liệu",
    accessorKey: "date",
    cell: (props) => formatDate(props.row.original.date, "dd/MM/yyyy"),
  },
  {
    header: "Click",
    accessorKey: "clicks",
  },
  {
    header: "Ngân sách đã tiêu",
    accessorKey: "cost",
    cell: (props) => formatDollarAmount(props.row.original.cost),
  },
  {
    header: "Lượt hiển thị",
    accessorKey: "impression",
  },
  {
    header: "CTR",
    accessorKey: "ctr",
    cell: (props) => `${fixedNumber(props.row.original.ctr)}%`,
  },
  {
    header: "CPM",
    accessorKey: "cpm",
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgCpc",
    cell: (props) => formatDollarAmount(props.row.original.avgCpc),
  },
  {
    header: "Mục tiêu CPC",
    accessorKey: "targetCpc",
    cell: (props) => formatDollarAmount(props.row.original.targetCpc),
  },
  {
    header: "Ngân sách chiến dịch",
    accessorKey: "campaignBudget",
    cell: (props) => formatDollarAmount(props.row.original.campaignBudget),
  },
];
