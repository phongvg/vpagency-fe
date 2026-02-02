import type { ProjectType } from "@/modules/projectType/types/projectType.type";
import { AppButton } from "@/shared/components/common/AppButton";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns/format";
import { SquarePen, Trash2 } from "lucide-react";

export const projectTypeColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<ProjectType>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên loại dự án",
    accessorKey: "name",
  },
  {
    header: "Thời gian tạo",
    accessorKey: "createdAt",
    cell: (props) => formatDate(props.row.original.createdAt, "dd/MM/yyyy HH:mm"),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center'>
        <AppButton size='sm' onClick={() => onEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton size='sm' onClick={() => onDelete(props.row.original.id)}>
          <Trash2 />
        </AppButton>
      </div>
    ),
  },
];
