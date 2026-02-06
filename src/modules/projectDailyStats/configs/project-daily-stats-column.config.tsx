import type { ProjectDailyStats } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import BadgeStatus from "@/shared/components/BadgeStatus/BadgeStatus";
import { AppButton } from "@/shared/components/common/AppButton";
import ListTooltip from "@/shared/components/ListTooltip/ListTooltip";
import type { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

export const projectDailyStatsColumnConfig = ({
  roles,
  onOpenEdit,
  onDelete,
}: {
  roles: Role[] | undefined;
  onOpenEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<ProjectDailyStats>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày",
    accessorKey: "date",
    cell: (props) => formatDate(props.row.original.date, "dd/MM/yyyy"),
  },
  {
    header: "Tên dự án",
    accessorKey: "projectName",
    minSize: 180,
  },
  {
    header: "Trạng thái dự án",
    accessorKey: "projectStatus",
    minSize: 180,
    cell: (props) => <BadgeStatus status={props.row.original.projectStatus} />,
  },
  ...((isAdminOrAccounting(roles) && [
    {
      header: "Lợi nhuận",
      accessorKey: "profit",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => formatDollarAmount(props.row.original.profit),
    },
    {
      id: "roi",
      header: "ROI (%)",
      accessorKey: "roi",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => `${fixedNumber(props.row.original.roi)}%`,
    },
    {
      header: "Hoa hồng tạm giữ",
      accessorKey: "holdRevenue",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => formatDollarAmount(props.row.original.holdRevenue),
    },
    {
      header: "Hoa hồng rút về",
      accessorKey: "receivedRevenue",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => formatDollarAmount(props.row.original.receivedRevenue),
    },
    {
      header: "Tổng Ref",
      accessorKey: "totalRef",
      enableHiding: isAdminOrAccounting(roles),
    },
    {
      header: "Chi phí mỗi Ref",
      accessorKey: "costPerRef",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => formatDollarAmount(props.row.original.costPerRef),
    },
    {
      header: "Tỷ lệ Ref/Click (%)",
      accessorKey: "rateRefPerClick",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => `${fixedNumber(props.row.original.rateRefPerClick)}%`,
    },
    {
      header: "Số FTD",
      accessorKey: "totalFtd",
      enableHiding: isAdminOrAccounting(roles),
    },
    {
      header: "Chi phí mỗi FTD",
      accessorKey: "costPerFtd",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => formatDollarAmount(props.row.original.costPerFtd),
    },
    {
      header: "Tỷ lệ FTD/Ref (%)",
      accessorKey: "costFtdPerRef",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => `${fixedNumber(props.row.original.costFtdPerRef)}%`,
    },
    {
      header: "Volume key/ngày",
      accessorKey: "totalTargetDailyKeyVolume",
      enableHiding: isAdminOrAccounting(roles),
    },
    {
      header: "Dự tính Ref/ngày",
      accessorKey: "totalTargetRef",
      enableHiding: isAdminOrAccounting(roles),
    },
    {
      header: "% Click đạt được",
      accessorKey: "totalClickPerVolume",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => `${fixedNumber(props.row.original.totalClickPerVolume)}%`,
    },
    {
      header: "% Ref đạt được",
      accessorKey: "totalRefPerVolume",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => `${fixedNumber(props.row.original.totalRefPerVolume)}%`,
    },
  ]) as ColumnDef<ProjectDailyStats>[]),
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
    header: "Thầu",
    accessorKey: "totalTargetCpc",
    cell: (props) => formatDollarAmount(props.row.original.totalTargetCpc),
  },
  {
    id: "activeCountries",
    header: "Quốc gia đang cắn",
    accessorKey: "activeCountries",
    cell: (props) => {
      const countries = props.row.original.activeCountries;
      if (countries.length === 0) return null;

      return (
        <ListTooltip
          data={countries.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
          columns={[
            { key: "location", label: "Quốc gia" },
            { key: "clicks", label: "Click" },
            { key: "impression", label: "Lượt hiển thị" },
            { key: "ctr", label: "CTR" },
            { key: "cpc", label: "CPC" },
            { key: "cpm", label: "CPM" },
            { key: "cost", label: "Chi phí" },
          ]}
        />
      );
    },
  },
  ...((isAdminOrAccounting(roles) && [
    {
      id: "actions",
      header: "Thao tác",
      enableHiding: isAdminOrAccounting(roles),
      cell: (props) => {
        return (
          <div className='flex items-center'>
            <AppButton size='sm' onClick={() => onOpenEdit(props.row.original.id)}>
              <SquarePen />
            </AppButton>

            <AppButton size='sm' onClick={() => onDelete(props.row.original.id)}>
              <Trash2 />
            </AppButton>
          </div>
        );
      },
    },
  ]) as ColumnDef<ProjectDailyStats>[]),
];
