import type { EmployeeProjectItem } from "@/modules/employeePerfomance/types/employeePerformance.type";
import type { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import type { ColumnDef } from "@tanstack/react-table";

export const employeeDetailColumnConfig = (roles: Role[] | undefined): ColumnDef<EmployeeProjectItem>[] => [
  {
    id: "project-name",
    header: "Tên dự án",
    accessorKey: "projectName",
  },
  {
    id: "project-metrics",
    header: "Chỉ số dự án",
    columns: [
      {
        id: "cost",
        header: "Đã tiêu",
        accessorKey: "cost",
        cell: (props) => <span className='font-bold text-red-500'>{formatDollarAmount(props.row.original.cost)}</span>,
      },
      {
        id: "cpc",
        header: "CPC",
        accessorKey: "cpc",
        cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.cpc)}</span>,
      },
      {
        id: "clicks",
        header: "Lượt click",
        accessorKey: "clicks",
        cell: (props) => <span className='font-bold text-blue-500'>{props.row.original.clicks}</span>,
      },
      {
        id: "impressions",
        header: "Lượt hiển thị",
        accessorKey: "impressions",
        cell: (props) => <span className='font-bold text-sky-500'>{props.row.original.impressions}</span>,
      },
      {
        id: "ref",
        header: "Số lượng Ref",
        accessorKey: "ref",
        cell: (props) => <span className='font-bold text-cyan-500'>{props.row.original.ref}</span>,
      },
      {
        id: "ftd",
        header: "Số lượng Ftd",
        accessorKey: "ftd",
        cell: (props) => <span className='font-bold text-lime-500'>{props.row.original.ftd}</span>,
      },
    ],
  },
  {
    id: "task-metrics",
    header: "Chỉ số công việc",
    columns: [
      {
        id: "tasks-assigned",
        header: "Task được giao",
        accessorKey: "tasksAssigned",
        cell: (props) => <span className='font-bold text-slate-300'>{props.row.original.tasksAssigned}</span>,
      },
      {
        id: "tasks-completed",
        header: "Task hoàn thành",
        accessorKey: "tasksCompleted",
        cell: (props) => <span className='font-bold text-green-500'>{props.row.original.tasksCompleted}</span>,
      },
      {
        id: "tasks-failed",
        header: "Task không hoàn thành",
        accessorKey: "tasksFailed",
        cell: (props) => <span className='font-bold text-red-500'>{props.row.original.tasksFailed}</span>,
      },
      {
        id: "tasks-completion-rate",
        header: "% Task hoàn thành",
        accessorKey: "tasksCompletionRate",
        cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.tasksCompletionRate)}%`}</span>,
      },
      {
        id: "links-assigned",
        header: "Link được giao",
        accessorKey: "linksAssigned",
        cell: (props) => <span className='font-bold text-violet-500'>{props.row.original.linksAssigned}</span>,
      },
      {
        id: "links-profitable",
        header: "Link cắn tiền",
        accessorKey: "linksProfitable",
        cell: (props) => <span className='font-bold text-pink-500'>{props.row.original.linksProfitable}</span>,
      },
      {
        id: "links-profit-rate",
        header: "% Link cắn tiền",
        accessorKey: "linksProfitRate",
        cell: (props) => <span className='font-bold text-rose-500'>{`${fixedNumber(props.row.original.linksProfitRate)}%`}</span>,
      },
    ],
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          id: "financial-metrics",
          header: "Chỉ số tài chính",
          columns: [
            {
              id: "hold-revenue",
              header: "Hoa hồng tạm giữ",
              accessorKey: "holdRevenue",
              cell: (props) => <span className='font-bold text-orange-500'>{formatDollarAmount(props.row.original.holdRevenue)}</span>,
            },
            {
              id: "received-revenue",
              header: "Hoa hồng rút về",
              accessorKey: "receivedRevenue",
              cell: (props) => <span className='font-bold text-emerald-500'>{formatDollarAmount(props.row.original.receivedRevenue)}</span>,
            },
            {
              id: "profit",
              header: "Lợi nhuận",
              accessorKey: "profit",
              cell: (props) => <span className='font-bold text-green-500'>{formatDollarAmount(props.row.original.profit)}</span>,
            },
            {
              id: "roi",
              header: "ROI",
              accessorKey: "roi",
              cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.roi)}%`}</span>,
            },
          ],
        },
      ]
    : []) as ColumnDef<EmployeeProjectItem>[]),
];
