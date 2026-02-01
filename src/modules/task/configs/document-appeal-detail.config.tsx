import type { TaskDocumentAppealDetail } from "@/modules/task/types/task.type";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const documentAppealDetailColumnConfig = (): ColumnDef<TaskDocumentAppealDetail>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày kháng giấy",
    accessorKey: "appealDate",
    cell: (props) => formatDate(props.row.original.appealDate, "dd/MM/yyyy"),
  },
  {
    header: "Dự án",
    accessorKey: "projectName",
  },
  {
    header: "Số lượng đơn kháng",
    accessorKey: "appealCount",
  },
  {
    header: "Số lượng kháng thành công",
    accessorKey: "successCount",
  },
  {
    header: "Tỷ lệ thành công",
    accessorKey: "successRate",
    cell: (props) => `${props.row.original.successRate}%`,
  },
  {
    header: "Ghi chú",
    accessorKey: "note",
  },
  {
    header: "Người tạo",
    accessorKey: "creator",
    cell: (props) => <UserAvatar data={props.row.original.creator} />,
  },
];
