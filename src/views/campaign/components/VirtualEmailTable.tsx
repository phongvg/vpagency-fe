import { addDash } from '@/helpers/addDash'
import { GmailUIDMapping } from '@/views/campaign/types/campaign.type'
import { useCallback, useMemo } from 'react'
import { FixedSizeList } from 'react-window'

interface VirtualEmailTableProps {
  email: GmailUIDMapping[]
  height?: number
}

const ROW_HEIGHT = 80
const HEADER_HEIGHT = 56

export default function VirtualEmailTable({ email, height = 860 }: VirtualEmailTableProps) {
  const tableHeight = height - HEADER_HEIGHT

  const columnWidths = useMemo(
    () => ({
      stt: 70,
      email: 510,
      uid: 520,
    }),
    [],
  )

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths])

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const emailItem = email[index]

      return (
        <div
          style={{
            ...style,
            display: 'grid',
            gridTemplateColumns: `${columnWidths.stt}px ${columnWidths.email}px ${columnWidths.uid}px`,
            alignItems: 'center',
            borderBottom: '1px solid #e5e7eb',
            boxSizing: 'border-box',
          }}
          className="bg-white"
        >
          <div className="flex items-center px-4 border-r">{index + 1}</div>
          <div className="flex items-center px-4 border-r whitespace-nowrap">{emailItem.gmail}</div>
          <div className="flex items-center px-4 border-r whitespace-nowrap">{addDash(emailItem.uid || '')}</div>
        </div>
      )
    },
    [email, columnWidths],
  )

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <div style={{ width: '100%', height: height, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: totalWidth }}>
          <div style={{ height: HEADER_HEIGHT }} className="bg-white border-gray-200 border-b">
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
                className="flex items-center px-4 border-r font-semibold"
              >
                STT
              </div>
              <div
                style={{ width: columnWidths.email, minWidth: columnWidths.email }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Email
              </div>
              <div
                style={{ width: columnWidths.uid, minWidth: columnWidths.uid }}
                className="flex items-center px-4 border-r font-semibold"
              >
                UID
              </div>
            </div>
          </div>

          <FixedSizeList
            height={tableHeight}
            itemCount={email.length}
            itemSize={ROW_HEIGHT}
            width={totalWidth}
            style={{ overflowX: 'hidden' }}
          >
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  )
}
