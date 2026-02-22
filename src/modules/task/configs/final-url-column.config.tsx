import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
import ListTooltip from "@/shared/components/ListTooltip";
import { formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";

export const finalUrlColumnConfig = (onCopy: (text: string) => void): ColumnDef<FinalUrl>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên URL",
    accessorKey: "name",
    minSize: 150,
    cell: (props) => <span className='font-semibold text-primary'>{props.row.original.name}</span>,
  },
  {
    header: "URL",
    accessorKey: "finalURL",
    cell: (props) => {
      const row = props.row.original;

      return (
        <a
          href={row.finalURL}
          target='_blank'
          rel='noopener noreferrer'
          className='block max-w-[250px] font-medium text-blue-600 dark:text-blue-400 hover:underline truncate'>
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
          <span className='font-medium text-yellow-700 dark:text-yellow-400'>
            <ListTooltip data={countriesTier1.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          </span>
          <button
            type='button'
            title='Sao chép'
            onClick={() => onCopy(countriesTier1.join("\n"))}
            className='text-muted-foreground hover:text-primary'>
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
          <span className='font-medium text-blue-700 dark:text-blue-400'>
            <ListTooltip data={countriesTier2.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          </span>
          <button
            type='button'
            title='Sao chép'
            onClick={() => onCopy(countriesTier2.join("\n"))}
            className='text-muted-foreground hover:text-primary'>
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
          <span className='font-medium text-green-700 dark:text-green-400'>
            <ListTooltip data={countriesTier3.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          </span>
          <button
            type='button'
            title='Sao chép'
            onClick={() => onCopy(countriesTier3.join("\n"))}
            className='text-muted-foreground hover:text-primary'>
            <Copy size={12} />
          </button>
        </div>
      );
    },
  },
  {
    header: "Mục tiêu Ref",
    accessorKey: "targetRef",
    cell: (props) => <span className='font-semibold text-purple-600 dark:text-purple-400'>{props.row.original.targetRef}</span>,
  },
  {
    header: "Mục tiêu chi phí Ref",
    accessorKey: "targetCostPerRef",
    cell: (props) => (
      <span className='font-semibold text-green-700 dark:text-green-400'>{formatDollarAmount(props.row.original.targetCostPerRef)}</span>
    ),
  },
  {
    header: "Mục tiêu FTD",
    accessorKey: "targetFtd",
    cell: (props) => <span className='font-semibold text-purple-600 dark:text-purple-400'>{props.row.original.targetFtd}</span>,
  },
  {
    header: "Mục tiêu chi phí FTD",
    accessorKey: "targetCostPerFtd",
    cell: (props) => (
      <span className='font-semibold text-green-700 dark:text-green-400'>{formatDollarAmount(props.row.original.targetCostPerFtd)}</span>
    ),
  },
  {
    header: "Mục tiêu CPC",
    accessorKey: "targetCpc",
    cell: (props) => <span className='font-semibold text-green-700 dark:text-green-400'>{formatDollarAmount(props.row.original.targetCpc)}</span>,
  },
];
