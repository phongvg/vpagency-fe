import { Badge } from "@/shared/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { fixedNumber } from "@/shared/utils/common.util";

interface ListTooltipProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

export default function ListTooltip<T>({ data, columns }: ListTooltipProps<T>) {
  console.log("data :>> ", data);

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Badge variant='outline'>+{data.length}</Badge>
      </HoverCardTrigger>

      <HoverCardContent className='flex w-64 flex-col gap-0.5'>
        <ScrollArea className='w-full'>
          <div className='p-2'>
            <table className='w-full'>
              <thead className='bg-black'>
                <tr className='border-gray-600 border-b'>
                  {columns.map((col) => (
                    <th key={String(col.key)} className='px-3 py-1 text-left whitespace-nowrap'>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className='border-gray-700 last:border-0 border-b'>
                    {columns.map((col) => {
                      const value = row[col.key];

                      return (
                        <td key={String(col.key)} className='px-3 py-1 text-left'>
                          {typeof value === "number" && col.key === "ctr"
                            ? fixedNumber(value) + "%"
                            : typeof value === "number"
                              ? fixedNumber(value)
                              : String(value ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
}
