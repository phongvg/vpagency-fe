import type { AppealAccount } from "@/modules/appealAccount/types/appealAccount.type";
import { AppButton } from "@/shared/components/common/AppButton";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

export const appealAccountColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<AppealAccount>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên Profile",
    accessorKey: "profileName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "UID",
    accessorKey: "uid",
  },
  {
    header: "MCC",
    accessorKey: "mcc",
  },
  {
    header: "Nền tảng kháng cáo",
    accessorKey: "appealPlatform",
  },
  {
    header: "Người kháng cáo",
    accessorKey: "appealedBy",
  },
  {
    header: "Người sử dụng",
    accessorKey: "usedBy",
  },
  {
    header: "Mức độ hiếm",
    accessorKey: "rarityLevel",
  },
  {
    header: "Người tạo",
    accessorKey: "creator",
    cell: (props) => {
      const creator = props.row.original.creator;
      if (!creator) return null;
      return `${creator.firstName || ""} ${creator.lastName || ""}`.trim() || creator.username || "-";
    },
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
