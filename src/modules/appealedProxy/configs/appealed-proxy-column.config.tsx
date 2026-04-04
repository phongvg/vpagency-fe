import type { AppealedProxy } from "@/modules/appealedProxy/types/appealedProxy.type";
import AppButton from "@/shared/components/common/AppButton";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

export const appealedProxyColumnConfig = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<AppealedProxy>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
    minSize: 40,
  },
  {
    header: "IP",
    accessorKey: "ip",
    minSize: 140,
  },
  {
    header: "Protocol",
    accessorKey: "protocol",
    minSize: 90,
  },
  {
    header: "Quốc gia",
    accessorKey: "country",
    minSize: 100,
  },
  {
    header: "Nguồn",
    accessorKey: "source",
    minSize: 120,
  },
  {
    header: "Người dùng",
    accessorKey: "user",
    minSize: 120,
  },
  {
    header: "Ngày mua",
    accessorKey: "purchasedAt",
    minSize: 120,
    cell: (props) => (props.row.original.purchasedAt ? formatDate(props.row.original.purchasedAt, "dd/MM/yyyy") : "-"),
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    minSize: 120,
    cell: (props) => formatDate(props.row.original.createdAt, "dd/MM/yyyy HH:mm"),
  },
  {
    id: "actions",
    header: "Thao tác",
    minSize: 100,
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
