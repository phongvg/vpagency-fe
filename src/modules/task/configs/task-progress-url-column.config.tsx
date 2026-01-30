import type { FinalURLGroup } from "@/modules/finalUrl/types/finalUrl.type";
import { Button } from "@/shared/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";

export const taskProgressUrlColumnConfig = (onOpenCampaignStats: (finalUrlId: string) => void): ColumnDef<FinalURLGroup>[] => [
  {
    header: "STT",
    accessorKey: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "URL",
    accessorKey: "finalUrlName",
    cell: (props) => {
      const row = props.row.original;

      return (
        <div className='flex flex-col gap-1'>
          <span>{row.finalUrlName}</span>
          <a href={row.finalURL} target='_blank' rel='noopener noreferrer' className='block max-w-[200px] text-blue-500 hover:underline truncate'>
            {row.finalURL}
          </a>
        </div>
      );
    },
  },
  {
    header: "Thao tác",
    cell: (props) => {
      const row = props.row.original;

      return (
        <Button variant='link' size='sm' className='px-0' onClick={() => onOpenCampaignStats(row.finalUrlId)}>
          Cập nhật số liệu ({row.totalCampaignDailyStats})
        </Button>
      );
    },
  },
];
