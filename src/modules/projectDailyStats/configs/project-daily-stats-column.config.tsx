import type { ProjectDailyStats } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import type { Role } from "@/shared/constants/role.constant";
import { formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

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
    // meta: {
    //   sticky: "left",
    //   stickyOffset: 0,
    // },
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
    // meta: {
    //   sticky: "left",
    //   stickyOffset: 30,
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
  // ...((isAdminOrAccounting(roles)
  //   ? [
  //       {
  //         header: "Lợi nhuận",
  //         accessorKey: "profit",
  //         enableHiding: isAdminOrAccounting(roles),
  //         cell: (props) => formatDollarAmount(props.row.original.profit),
  //       },
  //       {
  //         id: "roi",
  //         header: "ROI (%)",
  //         accessorKey: "roi",
  //         enableHiding: isAdminOrAccounting(roles),
  //         cell: (props) => `${fixedNumber(props.row.original.roi)}%`,
  //       },
  //       {
  //         header: "Hoa hồng tạm giữ",
  //         accessorKey: "holdRevenue",
  //         enableHiding: isAdminOrAccounting(roles),
  //         cell: (props) => formatDollarAmount(props.row.original.holdRevenue),
  //       },
  //       {
  //         header: "Hoa hồng rút về",
  //         accessorKey: "receivedRevenue",
  //         enableHiding: isAdminOrAccounting(roles),
  //         cell: (props) => formatDollarAmount(props.row.original.receivedRevenue),
  //       },
  //     ]
  //   : []) as ColumnDef<ProjectDailyStats>[]),
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
  // ...((isAdminOrAccounting(roles)
  //   ? [
  //       {
  //         id: "actions",
  //         header: "Thao tác",
  //         enableHiding: isAdminOrAccounting(roles),
  //         cell: (props) => {
  //           return (
  //             <div className='flex items-center'>
  //               <AppButton size='sm' onClick={() => onEdit(props.row.original.id)}>
  //                 <SquarePen />
  //               </AppButton>

  //               <AppButton size='sm' onClick={() => onDelete(props.row.original.id)}>
  //                 <Trash2 />
  //               </AppButton>
  //             </div>
  //           );
  //         },
  //       },
  //     ]
  //   : []) as ColumnDef<ProjectDailyStats>[]),
];
