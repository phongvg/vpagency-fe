import type { ProjectType } from "@/modules/projectType/types/projectType.type";
import AppButton from "@/shared/components/common/AppButton";
import type { ColumnDef } from "@tanstack/react-table";
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
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên loại dự án",
    accessorKey: "name",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center gap-2'>
        <AppButton size='sm' className='bg-[#fce0a6] text-black hover:bg-[#f5d08a]' onClick={() => onEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton size='sm' className='bg-[#e52521] text-white hover:bg-[#c41e1a]' onClick={() => onDelete(props.row.original.id)}>
          <Trash2 />
        </AppButton>
      </div>
    ),
  },
];
