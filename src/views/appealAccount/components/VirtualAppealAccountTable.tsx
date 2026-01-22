import { UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'
import { useCallback, useMemo } from 'react'
import { FixedSizeList } from 'react-window'

interface VirtualAppealAccountTableProps {
  appealAccounts: UpdateAppealAccountRequest[]
  height?: number
}

const ROW_HEIGHT = 60
const HEADER_HEIGHT = 56

const columns = [
  { key: 'profileName', widthKey: 'profileName', align: 'items-center' },
  { key: 'email', widthKey: 'email', align: 'items-center' },
  { key: 'password', widthKey: 'password', align: 'items-center' },
  { key: 'recoveryEmail', widthKey: 'recoveryEmail', align: 'items-center' },
  { key: 'twoFa', widthKey: 'twoFa', align: 'items-center' },
  { key: 'mcc', widthKey: 'mcc', align: 'items-center' },
  { key: 'uid', widthKey: 'uid', align: 'justify-center items-center' },
  { key: 'appealPlatform', widthKey: 'appealPlatform', align: 'items-center' },
  { key: 'appealedBy', widthKey: 'appealedBy', align: 'items-center' },
  { key: 'usedBy', widthKey: 'usedBy', align: 'items-center' },
  { key: 'note', widthKey: 'note', align: 'items-center' },
  { key: 'note2', widthKey: 'note2', align: 'items-center' },
  { key: 'rarityLevel', widthKey: 'rarityLevel', align: 'items-center' },
]

const headerColumns = [
  { key: 'profileName', label: 'Tên hồ sơ', widthKey: 'profileName' },
  { key: 'email', label: 'Email', widthKey: 'email' },
  { key: 'password', label: 'Mật khẩu', widthKey: 'password' },
  { key: 'recoveryEmail', label: 'Email khôi phục', widthKey: 'recoveryEmail' },
  { key: 'twoFa', label: 'Mã 2FA', widthKey: 'twoFa' },
  { key: 'mcc', label: 'MCC', widthKey: 'mcc' },
  { key: 'uid', label: 'UID', widthKey: 'uid' },
  { key: 'appealPlatform', label: 'Sàn kháng được', widthKey: 'appealPlatform' },
  { key: 'appealedBy', label: 'Người kháng', widthKey: 'appealedBy' },
  { key: 'usedBy', label: 'Người sử dụng', widthKey: 'usedBy' },
  { key: 'note', label: 'Ghi chú', widthKey: 'note' },
  { key: 'note2', label: 'Ghi chú 2', widthKey: 'note2' },
  { key: 'rarityLevel', label: 'Mức độ hiếm', widthKey: 'rarityLevel' },
]

export default function VirtualAppealAccountTable({ appealAccounts, height = 860 }: VirtualAppealAccountTableProps) {
  const tableHeight = height - HEADER_HEIGHT

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      profileName: 200,
      email: 350,
      password: 250,
      recoveryEmail: 350,
      twoFa: 150,
      mcc: 150,
      uid: 150,
      appealPlatform: 200,
      appealedBy: 200,
      usedBy: 200,
      note: 300,
      note2: 300,
      rarityLevel: 150,
    }),
    [],
  )

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths])

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const account = appealAccounts[index]

      return (
        <div
          style={{
            ...style,
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            boxSizing: 'border-box',
          }}
          className="bg-white"
        >
          <div
            style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
            className="flex justify-center items-center px-4 border-r"
          >
            <span>{index + 1}</span>
          </div>

          {columns.map((col, index) => {
            const width = columnWidths[col.widthKey as keyof typeof columnWidths]

            return (
              <div
                key={col.key}
                style={{ width, minWidth: width }}
                className={`flex px-4 ${col.align} ${index !== columns.length - 1 ? 'border-r' : ''}`}
              >
                <span>{account[col.key as keyof UpdateAppealAccountRequest]}</span>
              </div>
            )
          })}
        </div>
      )
    },
    [appealAccounts, columnWidths],
  )

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <div style={{ width: '100%', height: height, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: totalWidth }}>
          <div style={{ height: HEADER_HEIGHT }} className="bg-white border-gray-200 border-b">
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
                className="flex justify-center items-center px-4 border-r font-semibold"
              >
                STT
              </div>

              {headerColumns.map((col, index) => {
                const width = columnWidths[col.widthKey as keyof typeof columnWidths]

                return (
                  <div
                    key={col.key}
                    style={{ width, minWidth: width }}
                    className={`flex items-center px-4 font-semibold ${index !== columns.length - 1 ? 'border-r' : ''}`}
                  >
                    {col.label}
                  </div>
                )
              })}
            </div>
          </div>

          <FixedSizeList
            height={tableHeight}
            itemCount={appealAccounts.length}
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
