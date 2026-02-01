import type { TaskResearchDetail } from "@/modules/task/types/task.type";
import { Button } from "@/shared/components/ui/button";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

export const researchDetailColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<TaskResearchDetail>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày ghi kết quả",
    accessorKey: "resultDate",
    cell: (props) => formatDate(props.row.original.resultDate, "dd/MM/yyyy"),
  },
  {
    header: "Kết quả nghiên cứu",
    accessorKey: "result",
    maxSize: 400,
  },
  {
    header: "Mức độ khó",
    accessorKey: "difficultyLevel",
  },
  {
    header: "Người nghiên cứu",
    accessorKey: "creator",
    cell: (props) => {
      return <UserAvatar data={props.row.original.creator} />;
    },
  },
  {
    header: "Hành động",
    accessorKey: "actions",
    cell: (props) => {
      return (
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='default' onClick={() => onEdit(props.row.original.id)}>
            <SquarePen />
          </Button>

          <Button size='icon' variant='default' onClick={() => onDelete(props.row.original.id)}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
