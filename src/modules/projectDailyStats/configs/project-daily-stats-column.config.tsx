import type { ProjectDailyStats } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import BadgeStatus from "@/shared/components/BadgeStatus";
import AppButton from "@/shared/components/common/AppButton";
import ListTooltip from "@/shared/components/ListTooltip";
import type { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

export const projectDailyStatsColumnConfig = ({
  roles,
  onEdit,
  onDelete,
}: {
  roles: Role[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<ProjectDailyStats>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
    meta: {
      sticky: "left",
      stickyOffset: 0,
    },
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          id: "actions",
          header: "Thao tác",
          enableHiding: isAdminOrAccounting(roles),
          meta: {
            sticky: "left",
            stickyOffset: 30,
          },
          cell: (props) => {
            const isCompleted = props.row.original.status === "COMPLETED";
            if (!isCompleted) return null;

            return (
              <div className='flex items-center'>
                <AppButton size='sm' onClick={() => onEdit(props.row.original.id)}>
                  <SquarePen />
                </AppButton>

                <AppButton size='sm' onClick={() => onDelete(props.row.original.id)}>
                  <Trash2 />
                </AppButton>
              </div>
            );
          },
        },
      ]
    : []) as ColumnDef<ProjectDailyStats>[]),
  {
    header: "Ngày",
    accessorKey: "date",
    cell: (props) => formatDate(props.row.original.date, "dd/MM/yyyy"),
  },
  {
    header: "Tên dự án",
    accessorKey: "projectName",
    minSize: 180,
    meta: {
      sticky: "left",
      stickyOffset: isAdminOrAccounting(roles) ? 140 : 30,
    },
  },
  {
    header: "Loại dự án",
    accessorKey: "projectType",
    minSize: 150,
  },
  {
    header: "Trạng thái dự án",
    accessorKey: "projectStatus",
    minSize: 180,
    cell: (props) => <BadgeStatus status={props.row.original.projectStatus} />,
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          header: "Lợi nhuận",
          accessorKey: "profit",
          enableHiding: isAdminOrAccounting(roles),
          cell: (props) => <span className='font-bold text-green-500'>{formatDollarAmount(props.row.original.profit)}</span>,
        },
        {
          id: "roi",
          header: "ROI (%)",
          accessorKey: "roi",
          enableHiding: isAdminOrAccounting(roles),
          cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.roi)}%`}</span>,
        },
        {
          header: "Hoa hồng tạm giữ",
          accessorKey: "holdRevenue",
          enableHiding: isAdminOrAccounting(roles),
          cell: (props) => <span className='font-bold text-orange-500'>{formatDollarAmount(props.row.original.holdRevenue)}</span>,
        },
        {
          header: "Hoa hồng rút về",
          accessorKey: "receivedRevenue",
          enableHiding: isAdminOrAccounting(roles),
          cell: (props) => <span className='font-bold text-emerald-500'>{formatDollarAmount(props.row.original.receivedRevenue)}</span>,
        },
      ]
    : []) as ColumnDef<ProjectDailyStats>[]),
  {
    header: "Tổng Ref",
    accessorKey: "totalRef",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-cyan-500'>{props.row.original.totalRef}</span>,
  },
  {
    header: "Chi phí mỗi Ref",
    accessorKey: "costPerRef",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-pink-500'>{formatDollarAmount(props.row.original.costPerRef)}</span>,
  },
  {
    header: "Tỷ lệ Ref/Click (%)",
    accessorKey: "rateRefPerClick",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-teal-500'>{`${fixedNumber(props.row.original.rateRefPerClick)}%`}</span>,
  },
  {
    header: "Số FTD",
    accessorKey: "totalFtd",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-lime-500'>{props.row.original.totalFtd}</span>,
  },
  {
    header: "Chi phí mỗi FTD",
    accessorKey: "costPerFtd",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-rose-500'>{formatDollarAmount(props.row.original.costPerFtd)}</span>,
  },
  {
    header: "Tỷ lệ FTD/Ref (%)",
    accessorKey: "costFtdPerRef",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-violet-500'>{`${fixedNumber(props.row.original.costFtdPerRef)}%`}</span>,
  },
  {
    header: "Volume key/ngày",
    accessorKey: "totalTargetDailyKeyVolume",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-amber-500'>{props.row.original.totalTargetDailyKeyVolume}</span>,
  },
  {
    header: "Dự tính Ref/ngày",
    accessorKey: "totalTargetRef",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-indigo-500'>{props.row.original.totalTargetRef}</span>,
  },
  {
    header: "% Click đạt được",
    accessorKey: "totalClickPerVolume",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-green-600'>{`${fixedNumber(props.row.original.totalClickPerVolume)}%`}</span>,
  },
  {
    header: "% Ref đạt được",
    accessorKey: "totalRefPerVolume",
    enableHiding: isAdminOrAccounting(roles),
    cell: (props) => <span className='font-bold text-emerald-600'>{`${fixedNumber(props.row.original.totalRefPerVolume)}%`}</span>,
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
    header: "Thầu",
    accessorKey: "totalTargetCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.totalTargetCpc)}</span>,
  },
  {
    id: "activeCountries",
    header: "Quốc gia đang cắn",
    accessorKey: "activeCountries",
    cell: (props) => {
      const countries = props.row.original.activeCountries;
      if (countries.length === 0) return null;

      return <ListTooltip data={countries.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />;
    },
  },
];
