import type { TaskAppealDetail } from "@/modules/task/types/task.type";
import { cn } from "@/shared/libs/utils";
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
    cell: (props) => <span className='font-medium text-primary'>{formatDate(props.row.original.appealDate, "dd/MM/yyyy")}</span>,
  },
  {
    header: "Nguyên nhân tạm ngưng",
    accessorKey: "suspensionReason",
    maxSize: 250,
    cell: (props) => <span className='text-muted-foreground italic'>{props.row.original.suspensionReason}</span>,
  },
  {
    header: "Số lượng kháng",
    accessorKey: "appealCount",
    cell: (props) => <span className='font-semibold text-blue-600 dark:text-blue-400'>{props.row.original.appealCount}</span>,
  },
  {
    header: "Số lượng thành công",
    accessorKey: "successCount",
    cell: (props) => <span className='font-semibold text-green-600 dark:text-green-400'>{props.row.original.successCount}</span>,
  },
  {
    header: "Số lượng thất bại",
    accessorKey: "failureCount",
    cell: (props) => <span className='font-semibold text-red-600 dark:text-red-400'>{props.row.original.failureCount}</span>,
  },
  {
    header: "Tỷ lệ thành công (%)",
    accessorKey: "successRate",
    cell: (props) => {
      const rate = fixedNumber(props.row.original.successRate);
      return (
        <span
          className={cn(
            "px-2 py-1 rounded font-bold",
            rate >= 70
              ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950"
              : rate >= 40
                ? "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950"
                : "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950"
          )}>
          {rate}%
        </span>
      );
    },
  },
];
