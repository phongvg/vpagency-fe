import type { Project } from "@/modules/project/types/project.type";
import BadgeStatus from "@/shared/components/BadgeStatus";
import AppButton from "@/shared/components/common/AppButton";
import UserAvatar from "@/shared/components/UserAvatar";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

interface ProjectColumnHandlers {
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export const projectColumnConfig = (handlers: ProjectColumnHandlers): ColumnDef<Project>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên dự án",
    accessorKey: "name",
  },
  {
    header: "Loại dự án",
    accessorKey: "type.name",
    cell: (props) => props.row.original.type?.name,
  },
  {
    header: "Người phụ trách",
    accessorKey: "owner",
    cell: (props) => <UserAvatar data={props.row.original.owner} />,
  },
  {
    header: "Trạng thái",
    accessorKey: "status.name",
    cell: (props) => <BadgeStatus status={props.row.original.status?.name} />,
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center gap-2'>
        <AppButton size='sm' onClick={() => handlers?.onEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton size='sm' onClick={() => handlers?.onDelete(props.row.original.id)}>
          <Trash2 />
        </AppButton>
      </div>
    ),
  },
];
