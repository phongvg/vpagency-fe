import type { Gmail } from "@/modules/gmail/types/gmail.type";
import BadgeStatus from "@/shared/components/BadgeStatus/BadgeStatus";
import { AppButton } from "@/shared/components/common/AppButton";
import UserAvatar from "@/shared/components/UserAvatar";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

interface GmailColumnHandlers {
  onEdit: (gmailId: string) => void;
  onDelete: (gmailId: string) => void;
}

export const gmailColumnConfig = (handlers?: GmailColumnHandlers): ColumnDef<Gmail>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Email",
    accessorKey: "name",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: (props) => <BadgeStatus status={props.row.original.status.name} />,
  },
  {
    header: "Người tạo",
    accessorKey: "creator",
    cell: (props) => <UserAvatar data={props.row.original.creator} />,
  },
  {
    header: "Người nhận mail",
    accessorKey: "assignedUsers",
    cell: (props) => <UserAvatar data={props.row.original.assignedUsers} />,
  },
  {
    header: "Proxy",
    accessorKey: "proxy",
  },
  {
    header: "Mật khẩu",
    accessorKey: "password",
  },
  {
    header: "Mail khôi phục",
    accessorKey: "recoverMail",
  },
  {
    header: "Mật khẩu mail khôi phục",
    accessorKey: "recoverMailPassword",
  },
  {
    header: "Mã 2FA",
    accessorKey: "code2fa",
  },
  {
    header: "Số điện thoại",
    accessorKey: "phone",
  },
  {
    header: "Năm tạo",
    accessorKey: "createdYear",
  },
  {
    header: "Tên hồ sơ",
    accessorKey: "profileName",
  },
  {
    header: "Giá tiền",
    accessorKey: "price",
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
