import type { ProjectStatus } from "@/modules/projectStatus/types/projectStatus.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Switch } from "@/shared/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns/format";
import { SquarePen, Trash2 } from "lucide-react";

export const projectStatusColumnConfig = ({
  onUpdateStatus,
  onEdit,
  onDelete,
}: {
  onUpdateStatus: (id: string, status: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<ProjectStatus>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên trạng thái",
    accessorKey: "name",
  },
  {
    id: "updatedStatus",
    header: "Trạng thái",
    cell: (props) => <Switch checked={props.row.original.active} onCheckedChange={(checked) => onUpdateStatus(props.row.original.id, !checked)} />,
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
