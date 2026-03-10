import type { ColumnDef } from "@tanstack/react-table";

export const employeeComparisonColumnConfig = (): ColumnDef<any>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  {
    id: "name",
    header: "Tên nhân viên",
    accessorKey: "name",
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
      },
      {
        id: "projects-assigned",
        header: "Dự án được giao",
        accessorKey: "projectsAssigned",
      },
      {
        id: "projects-profitable",
        header: "Dự án cắn tiền",
        accessorKey: "projectsProfitable",
      },
      {
        id: "projects-profit-rate",
        header: "% Dự án cắn tiền",
        accessorKey: "projectsProfitRate",
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
      },
    ],
  },
];
