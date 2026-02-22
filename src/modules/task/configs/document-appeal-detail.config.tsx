import type { TaskDocumentAppealDetail } from "@/modules/task/types/task.type";
import { Button } from "@/shared/components/ui/button";
import UserAvatar from "@/shared/components/UserAvatar";
import { cn } from "@/shared/libs/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Trash2 } from "lucide-react";

export const documentAppealDetailColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (documentAppealDetail: TaskDocumentAppealDetail) => void;
  onDelete: (id: string) => void;
}): ColumnDef<TaskDocumentAppealDetail>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày kháng giấy",
    accessorKey: "appealDate",
    cell: (props) => <span className='font-medium text-primary'>{formatDate(props.row.original.appealDate, "dd/MM/yyyy")}</span>,
  },
  {
    header: "Dự án",
    accessorKey: "projectName",
    minSize: 200,
    cell: (props) => <span className='font-semibold text-primary'>{props.row.original.projectName}</span>,
  },
  {
    header: "Số lượng đơn kháng",
    accessorKey: "appealCount",
    cell: (props) => <span className='font-semibold text-blue-600 dark:text-blue-400'>{props.row.original.appealCount}</span>,
  },
  {
    header: "Số lượng kháng thành công",
    accessorKey: "successCount",
    cell: (props) => <span className='font-semibold text-green-600 dark:text-green-400'>{props.row.original.successCount}</span>,
  },
  {
    header: "Tỷ lệ thành công",
    accessorKey: "successRate",
    cell: (props) => {
      const rate = props.row.original.successRate;
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
  {
    header: "Ghi chú",
    accessorKey: "note",
    cell: (props) => <span className='text-muted-foreground italic'>{props.row.original.note}</span>,
  },
  {
    header: "Người tạo",
    accessorKey: "creator",
    cell: (props) => <UserAvatar data={props.row.original.creator} />,
  },
  {
    header: "Hành động",
    accessorKey: "actions",
    cell: (props) => {
      return (
        <div className='flex items-center gap-2'>
          {/* <Button size='icon' variant='default' onClick={() => onEdit(props.row.original)}>
            <SquarePen />
          </Button> */}

          <Button size='icon' variant='default' onClick={() => onDelete(props.row.original.id)}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
