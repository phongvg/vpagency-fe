import type { TaskDocumentAppealDetail } from "@/modules/task/types/task.type";
import { Button } from "@/shared/components/ui/button";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";
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
