import type { ColumnDef } from "@tanstack/react-table";

export const employeeDetailColumnConfig = (): ColumnDef<any>[] => [
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
      },
      {
        id: "cpc",
        header: "CPC",
        accessorKey: "cpc",
      },
      {
        id: "clicks",
        header: "Lượt click",
        accessorKey: "clicks",
      },
      {
        id: "impressions",
        header: "Lượt hiển thị",
        accessorKey: "impressions",
      },
      {
        id: "ref",
        header: "Số lượng Ref",
        accessorKey: "ref",
      },
      {
        id: "ftd",
        header: "Số lượng Ftd",
        accessorKey: "ftd",
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
      },
      {
        id: "tasks-completed",
        header: "Task hoàn thành",
        accessorKey: "tasksCompleted",
      },
      {
        id: "tasks-failed",
        header: "Task không hoàn thành",
        accessorKey: "tasksFailed",
      },
      {
        id: "tasks-completion-rate",
        header: "% Task hoàn thành",
        accessorKey: "tasksCompletionRate",
        cell: ({ row }) => {
          const value = row.original.tasksCompletionRate;
          return value ? `${value}%` : "0%";
        },
      },
      {
        id: "links-assigned",
        header: "Link được giao",
        accessorKey: "linksAssigned",
      },
      {
        id: "links-profitable",
        header: "Link cắn tiền",
        accessorKey: "linksProfitable",
      },
      {
        id: "links-profit-rate",
        header: "% Link cắn tiền",
        accessorKey: "linksProfitRate",
        cell: ({ row }) => {
          const value = row.original.linksProfitRate;
          return value ? `${value}%` : "0%";
        },
      },
    ],
  },
  {
    id: "financial-metrics",
    header: "Chỉ số tài chính",
    columns: [
      {
        id: "hold-revenue",
        header: "Hoa hồng tạm giữ",
        accessorKey: "holdRevenue",
      },
      {
        id: "received-revenue",
        header: "Hoa hồng rút về",
        accessorKey: "receivedRevenue",
      },
      {
        id: "profit",
        header: "Lợi nhuận",
        accessorKey: "profit",
      },
      {
        id: "roi",
        header: "ROI",
        accessorKey: "roi",
        cell: ({ row }) => {
          const value = row.original.roi;
          return value ? `${value}%` : "0%";
        },
      },
    ],
  },
];
