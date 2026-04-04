import type { AppealAccount } from "@/modules/appealAccount/types/appealAccount.type";
import AppButton from "@/shared/components/common/AppButton";
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
    minSize: 170,
  },
  {
    header: "MCC",
    accessorKey: "mcc",
    minSize: 170,
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
    header: "Ghi chú 1",
    accessorKey: "note",
    minSize: 200,
  },
  {
    header: "Ghi chú 2",
    accessorKey: "note2",
    minSize: 200,
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center gap-2'>
        <AppButton size='sm' className='bg-[#fce0a6] hover:bg-[#f5d08a] text-black' onClick={() => onEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton size='sm' className='bg-[#e52521] hover:bg-[#c41e1a] text-white' onClick={() => onDelete(props.row.original.id)}>
          <Trash2 />
        </AppButton>
      </div>
    ),
  },
];
