import { UserStatus, type User } from "@/modules/user/types/user.type";
import { UserStatusBgColorMap, UserStatusColorMap, UserStatusLabelMap } from "@/modules/user/utils/user.util";
import AppButton from "@/shared/components/common/AppButton";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import UserAvatar from "@/shared/components/UserAvatar";
import { cn } from "@/shared/libs/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { KeyRound, SquarePen } from "lucide-react";

export const userColumnConfig = ({
  onUpdateStatus,
  onOpenEdit,
  onOpenChangePassword,
}: {
  onUpdateStatus: (id: string) => void;
  onOpenEdit: (id: string) => void;
  onOpenChangePassword: (id: string) => void;
}): ColumnDef<User>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Họ và tên",
    accessorKey: "fullName",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className='flex items-center gap-2'>
          <UserAvatar data={row} />
          <span>
            {row.firstName} {row.lastName}
          </span>
        </div>
      );
    },
  },
  {
    header: "Tên đăng nhập",
    accessorKey: "username",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className='flex items-center gap-2'>
          <Badge className={cn("rounded-lg", UserStatusBgColorMap[row.status], UserStatusColorMap[row.status])}>
            {UserStatusLabelMap[row.status]}
          </Badge>
        </div>
      );
    },
  },
  {
    header: "Thời gian tạo",
    accessorKey: "createdAt",
    cell: (props) => formatDate(props.row.original.createdAt, "dd/MM/yyyy HH:mm"),
  },
  {
    id: "updatedStatus",
    header: "Cập nhật trạng thái",
    cell: (props) => (
      <Switch checked={props.row.original.status === UserStatus.Active} onCheckedChange={() => onUpdateStatus(props.row.original.id)} />
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center'>
        <AppButton size='sm' onClick={() => onOpenEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton size='sm' onClick={() => onOpenChangePassword(props.row.original.id)}>
          <KeyRound />
        </AppButton>
      </div>
    ),
  },
];
