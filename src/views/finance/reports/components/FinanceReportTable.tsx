import { useMemo, useState, useCallback } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared'
import { formatUSD } from '@/helpers/formatUSD'
import { ProjectDailyStat } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { useProjectDailyStat } from '@/views/finance/reports/hooks/useProjectDailyStat'
import { useProjectDailyStatStore } from '@/views/finance/reports/store/useProjectDailyStatStore'
import { formatDate } from '@/helpers/formatDate'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { isAdminOrAccounting } from '@/utils/checkRole'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { Button, Checkbox, Dropdown } from '@/components/ui'
import { HiOutlineViewList } from 'react-icons/hi'
import { COLUMN_CONFIG } from '@/views/finance/reports/constants/financeReportColumnConfig.constant'

export default function FinanceReportTable() {
  const { filters, setFilters } = useProjectDailyStatStore()
  const { user } = useAuthStore()

  const { data, isLoading } = useProjectDailyStat(filters)

  const availableColumns = useMemo(() => {
    if (isAdminOrAccounting(user?.roles)) {
      return COLUMN_CONFIG
    }

    const restrictedColumns = [
      'profit',
      'totalRef',
      'costPerRef',
      'rateRefPerClick',
      'totalFtd',
      'costPerFtd',
      'costFtdPerRef',
      'totalTargetDailyKeyVolume',
      'totalTargetRef',
      'totalClickPerVolume',
      'totalRefPerVolume',
    ]
    return COLUMN_CONFIG.filter((col) => !restrictedColumns.includes(col.id))
  }, [user?.roles])

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    COLUMN_CONFIG.forEach((col) => {
      initial[col.id] = col.visible
    })
    return initial
  })

  const metaTableData = useMemo(() => data?.meta, [data?.meta])

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }, [])

  const toggleAllColumns = useCallback(() => {
    const allVisible = availableColumns.every((col) => col.required || columnVisibility[col.id])

    setColumnVisibility((prev) => {
      const updated = { ...prev }
      availableColumns.forEach((col) => {
        if (!col.required) {
          updated[col.id] = !allVisible
        }
      })
      return updated
    })
  }, [columnVisibility, availableColumns])

  const isAllColumnsVisible = useMemo(() => {
    return availableColumns.every((col) => col.required || columnVisibility[col.id])
  }, [columnVisibility, availableColumns])

  const allColumns: ColumnDef<ProjectDailyStat>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filters.page - 1) * filters.limit + row + 1}</span>
        },
      },
      {
        id: 'date',
        header: 'Ngày',
        accessorKey: 'date',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.date, 'DD/MM/YYYY')}</span>
        },
      },
      {
        id: 'projectName',
        header: 'Tên dự án',
        accessorKey: 'projectName',
      },
      ...(isAdminOrAccounting(user?.roles)
        ? ([
            {
              id: 'profit',
              header: 'Lợi nhuận',
              accessorKey: 'profit',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.profit)}</span>
              },
            },
            {
              id: 'totalRef',
              header: 'Tổng Ref',
              accessorKey: 'totalRef',
            },
            {
              id: 'costPerRef',
              header: 'Chi phí mỗi Ref',
              accessorKey: 'costPerRef',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.costPerRef)}</span>
              },
            },
            {
              id: 'rateRefPerClick',
              header: 'Tỷ lệ Ref/Click (%)',
              accessorKey: 'rateRefPerClick',
              cell: (props) => {
                const row = props.row.original
                return <span>{row.rateRefPerClick?.toFixed(2)}%</span>
              },
            },
            {
              id: 'totalFtd',
              header: 'Số FTD',
              accessorKey: 'totalFtd',
            },
            {
              id: 'costPerFtd',
              header: 'Chi phí mỗi FTD',
              accessorKey: 'costPerFtd',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.costPerFtd)}</span>
              },
            },
            {
              id: 'costFtdPerRef',
              header: 'Tỷ lệ FTD/Ref (%)',
              accessorKey: 'costFtdPerRef',
              cell: (props) => {
                const row = props.row.original
                return <span>{row.costFtdPerRef?.toFixed(2)}%</span>
              },
            },
            {
              id: 'totalTargetDailyKeyVolume',
              header: 'Volume key/ngày',
              accessorKey: 'totalTargetDailyKeyVolume',
            },
            {
              id: 'totalTargetRef',
              header: 'Dự tính Ref/ngày',
              accessorKey: 'totalTargetRef',
              cell: (props) => {
                const row = props.row.original
                return <span>{row.totalTargetRef}</span>
              },
            },
            {
              id: 'totalClickPerVolume',
              header: '% click đạt được',
              accessorKey: 'totalClickPerVolume',
              cell: (props) => {
                const row = props.row.original
                return <span>{row.totalClickPerVolume?.toFixed(2)}%</span>
              },
            },
            {
              id: 'totalRefPerVolume',
              header: '% Ref đạt được',
              accessorKey: 'totalRefPerVolume',
              cell: (props) => {
                const row = props.row.original
                return <span>{row.totalRefPerVolume?.toFixed(2)}%</span>
              },
            },
          ] as ColumnDef<ProjectDailyStat>[])
        : []),
      {
        id: 'totalCost',
        header: 'Tổng chi tiêu',
        accessorKey: 'totalCost',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.totalCost)}</span>
        },
      },
      {
        id: 'totalClicks',
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
      },
      {
        id: 'totalTargetCpc',
        header: 'Thầu',
        accessorKey: 'totalTargetCpc',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        id: 'activeCountries',
        header: 'Quốc gia đang cắn',
        accessorKey: 'activeCountries',
        cell: (props) => {
          const countries = props.row.original.activeCountries
          if (countries.length === 0) return null

          return (
            <TableTooltip
              data={countries.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
              columns={[
                { key: 'location', label: 'Quốc gia' },
                { key: 'clicks', label: 'Click' },
                { key: 'impression', label: 'Lượt hiển thị' },
                { key: 'ctr', label: 'CTR' },
                { key: 'cpc', label: 'CPC' },
                { key: 'cpm', label: 'CPM' },
                { key: 'cost', label: 'Chi phí' },
              ]}
            />
          )
        },
      },
    ],
    [user?.roles, filters],
  )

  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => columnVisibility[col.id as string])
  }, [allColumns, columnVisibility])

  const onPaginationChange = (page: number) => {
    const newFilter = { ...filters, page }
    setFilters(newFilter)
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filters, limit: value, page: 1 }
    setFilters(newFilter)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Dropdown
          renderTitle={
            <Button size="sm" variant="twoTone" icon={<HiOutlineViewList />}>
              Tùy chỉnh cột
            </Button>
          }
        >
          <div className="p-2 max-h-96 overflow-y-auto" style={{ minWidth: '250px' }}>
            <div className="flex items-center gap-2 hover:bg-gray-50 mb-2 px-2 py-1.5 pb-2 border-gray-200 border-b rounded">
              <Checkbox checked={isAllColumnsVisible} onChange={toggleAllColumns} />
              <span className="font-medium text-sm">Tất cả</span>
            </div>
            {availableColumns.map((col) => (
              <div key={col.id} className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded">
                <Checkbox
                  checked={columnVisibility[col.id]}
                  disabled={col.required}
                  onChange={() => toggleColumnVisibility(col.id)}
                />
                <span className="text-sm">{col.label}</span>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>

      <DataTable
        columns={visibleColumns}
        data={data?.items || []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  )
}
