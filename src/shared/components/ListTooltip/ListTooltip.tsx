import { Badge } from "@/shared/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { fixedNumber } from "@/shared/utils/common.util";

interface ListTooltipProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

export default function ListTooltip<T>({ data, columns }: ListTooltipProps<T>) {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant='outline' className='cursor-pointer'>
            +{data.length}
          </Badge>
        </TooltipTrigger>

        <TooltipContent
          className='bg-black p-0 border border-gray-700 w-auto max-w-md overflow-hidden'
          side='right'
          align='center'
          sideOffset={10}
          avoidCollisions={true}
          collisionPadding={20}>
          <div className='w-full max-h-[400px] overflow-x-auto overflow-y-hidden scrollbar-custom'>
            <div className='p-2'>
              <table className='w-full'>
                <thead className='bg-white/5'>
                  <tr className='border-gray-600 border-b'>
                    {columns.map((col) => (
                      <th key={String(col.key)} className='px-3 py-1.5 font-semibold text-primary text-sm text-left whitespace-nowrap'>
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
                          <td key={String(col.key)} className='px-3 py-1.5 text-sm text-left'>
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
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
