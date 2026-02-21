import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
import AppButton from "@/shared/components/common/AppButton";
import ListTooltip from "@/shared/components/ListTooltip";
import { copyTextToClipboard, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { Copy, SquarePen, Trash2 } from "lucide-react";

interface ProjectFinalUrlColumnHandlers {
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export const projectFinalUrlColumnConfig = (handlers: ProjectFinalUrlColumnHandlers): ColumnDef<FinalUrl>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên URL",
    accessorKey: "name",
  },
  {
    header: "URL",
    accessorKey: "finalURL",
    cell: (props) => {
      const row = props.row.original;

      return (
        <a href={row.finalURL} target='_blank' rel='noopener noreferrer' className='block max-w-[250px] hover:underline truncate'>
          {row.finalURL}
        </a>
      );
    },
  },
  {
    header: "Quốc gia hạng 1",
    accessorKey: "countriesTier1",
    cell: (props) => {
      const countriesTier1 = props.row.original.countriesTier1 ?? [];
      if (countriesTier1.length === 0) return null;

      return (
        <div className='flex items-center gap-2'>
          <ListTooltip data={countriesTier1.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          <button type='button' title='Sao chép' onClick={() => copyTextToClipboard(countriesTier1.join("\n"))}>
            <Copy size={12} />
          </button>
        </div>
      );
    },
  },
  {
    header: "Quốc gia hạng 2",
    accessorKey: "countriesTier2",
    cell: (props) => {
      const countriesTier2 = props.row.original.countriesTier2 ?? [];
      if (countriesTier2.length === 0) return null;

      return (
        <div className='flex items-center gap-2'>
          <ListTooltip data={countriesTier2.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          <button type='button' title='Sao chép' onClick={() => copyTextToClipboard(countriesTier2.join("\n"))}>
            <Copy size={12} />
          </button>
        </div>
      );
    },
  },
  {
    header: "Quốc gia hạng 3",
    accessorKey: "countriesTier3",
    cell: (props) => {
      const countriesTier3 = props.row.original.countriesTier3 ?? [];
      if (countriesTier3.length === 0) return null;

      return (
        <div className='flex items-center gap-2'>
          <ListTooltip data={countriesTier3.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          <button type='button' title='Sao chép' onClick={() => copyTextToClipboard(countriesTier3.join("\n"))}>
            <Copy size={12} />
          </button>
        </div>
      );
    },
  },
  {
    header: "Mục tiêu Ref",
    accessorKey: "targetRef",
  },
  {
    header: "Mục tiêu chi phí Ref",
    accessorKey: "targetCostPerRef",
    cell: (props) => formatDollarAmount(props.row.original.targetCostPerRef),
  },
  {
    header: "Mục tiêu FTD",
    accessorKey: "targetFtd",
  },
  {
    header: "Mục tiêu chi phí FTD",
    accessorKey: "targetCostPerFtd",
    cell: (props) => formatDollarAmount(props.row.original.targetCostPerFtd),
  },
  {
    header: "Volume key/ngày",
    accessorKey: "targetDailyKeyVolume",
  },
  {
    header: "Mục tiêu CPC",
    accessorKey: "targetCpc",
    cell: (props) => formatDollarAmount(props.row.original.targetCpc),
  },
  {
    header: "Ngân sách",
    accessorKey: "budget",
    cell: (props) => formatDollarAmount(props.row.original.budget),
  },
  {
    header: "Giá thầu đề xuất",
    accessorKey: "suggestedBid",
    cell: (props) => formatDollarAmount(props.row.original.suggestedBid),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: (props) => (
      <div className='flex items-center gap-2'>
        <AppButton type='button' size='sm' onClick={() => handlers?.onEdit(props.row.original.id)}>
          <SquarePen />
        </AppButton>

        <AppButton type='button' size='sm' onClick={() => handlers?.onDelete(props.row.original.id)}>
          <Trash2 />
        </AppButton>
      </div>
    ),
  },
];
