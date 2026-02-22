import type { TaskResearchDetail } from "@/modules/task/types/task.type";
import { Button } from "@/shared/components/ui/button";
import UserAvatar from "@/shared/components/UserAvatar";
import { cn } from "@/shared/libs/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

export const researchDetailColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (researchDetail: TaskResearchDetail) => void;
  onDelete: (id: string) => void;
}): ColumnDef<TaskResearchDetail>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày ghi kết quả",
    accessorKey: "resultDate",
    cell: (props) => <span className='font-medium text-primary'>{formatDate(props.row.original.resultDate, "dd/MM/yyyy")}</span>,
  },
  {
    header: "Kết quả nghiên cứu",
    accessorKey: "result",
    maxSize: 400,
    cell: (props) => <span className='font-medium text-foreground'>{props.row.original.result}</span>,
  },
  {
    header: "Mức độ khó",
    accessorKey: "difficultyLevel",
    cell: (props) => {
      const level = props.row.original.difficultyLevel?.toLowerCase() || "";
      return (
        <span
          className={cn(
            "px-2 py-1 rounded font-semibold",
            level.includes("dễ") || level.includes("thấp")
              ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950"
              : level.includes("trung bình") || level.includes("vừa")
                ? "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950"
                : level.includes("khó") || level.includes("cao")
                  ? "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950"
                  : "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950"
          )}>
          {props.row.original.difficultyLevel}
        </span>
      );
    },
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
          <Button size='icon' variant='default' onClick={() => onEdit(props.row.original)}>
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
