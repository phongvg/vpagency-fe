import { Badge, Tooltip } from '@/components/ui'
import { fixedNumber } from '@/helpers/fixedNumber'

interface TableTooltipProps<T> {
  data: T[]
  columns: { key: keyof T; label: string }[]
  trigger?: 'click' | 'hover'
  scrollable?: boolean
  maxHeight?: number
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

export function TableTooltip<T extends Record<string, any>>({
  data,
  columns,
  trigger = 'click',
  scrollable = true,
  maxHeight = 700,
  placement = 'left',
}: TableTooltipProps<T>) {
  return (
    <Tooltip
      scrollable={scrollable}
      trigger={trigger}
      maxHeight={maxHeight}
      placement={placement}
      title={
        <div className="text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-gray-600 border-b">
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-3 py-1 text-left whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-gray-700 last:border-0 border-b">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-3 py-1 text-left">
                      {typeof row[col.key] === 'number' && col.key === 'ctr'
                        ? fixedNumber(row[col.key]) + '%'
                        : typeof row[col.key] === 'number'
                          ? fixedNumber(row[col.key])
                          : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    >
      <div className="cursor-help" title="Click để xem chi tiết">
        <div className="flex items-center gap-1">
          <Badge content={`+${data.length}`} className="bg-blue-50 text-blue-700 text-xs" />
        </div>
      </div>
    </Tooltip>
  )
}
