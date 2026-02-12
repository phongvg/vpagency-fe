import type { TaskAppealDetail } from "@/modules/task/types/task.type";
import { fixedNumber } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const appealDetailColumnConfig: ColumnDef<TaskAppealDetail>[] = [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày kháng tài khoản tạm ngưng",
    accessorKey: "appealDate",
    cell: (props) => formatDate(props.row.original.appealDate, "dd/MM/yyyy"),
  },
  {
    header: "Nguyên nhân tạm ngưng",
    accessorKey: "suspensionReason",
    maxSize: 250,
  },
  {
    header: "Số lượng kháng",
    accessorKey: "appealCount",
  },
  {
    header: "Số lượng thành công",
    accessorKey: "successCount",
  },
  {
    header: "Số lượng thất bại",
    accessorKey: "failureCount",
  },
  {
    header: "Tỷ lệ thành công (%)",
    accessorKey: "successRate",
    cell: (props) => `${fixedNumber(props.row.original.successRate)}%`,
  },
];
