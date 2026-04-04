import type { FinalUrlEmployeeCampaignStat } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import BadgeStatus from "@/shared/components/BadgeStatus";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const employeeCampaignColumnConfig = (): ColumnDef<FinalUrlEmployeeCampaignStat>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  { header: "ID chiến dịch", accessorKey: "externalId" },
  {
    header: "Tên chiến dịch",
    accessorKey: "campaignName",
    minSize: 200,
  },
  { header: "UID", accessorKey: "uid" },
  { header: "Gmail", accessorKey: "gmail" },
  { header: "Trạng thái", accessorKey: "status", cell: (props) => <BadgeStatus status={props.row.original.status} /> },
  {
    header: "Tổng chi tiêu",
    accessorKey: "totalCost",
    cell: (props) => <span className='font-bold text-red-500'>{formatDollarAmount(props.row.original.totalCost)}</span>,
  },
  { header: "Lượt click", accessorKey: "totalClicks" },
  { header: "Tổng lượt hiển thị", accessorKey: "totalImpression" },
  { header: "CPC trung bình", accessorKey: "avgCpc", cell: (props) => formatDollarAmount(props.row.original.avgCpc) },
  { header: "CTR", accessorKey: "ctr", cell: (props) => <span>{fixedNumber(props.row.original.ctr)}%</span> },
  { header: "Số ngày hoạt động", accessorKey: "activeDays" },
  {
    header: "Lần nhập dữ liệu gần nhất",
    accessorKey: "latestImportAt",
    cell: (props) => (props.row.original.latestImportAt ? formatDate(new Date(props.row.original.latestImportAt), "dd/MM/yyyy") : ""),
  },
];
