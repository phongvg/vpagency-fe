import { DataTable } from '@/components/shared'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Button, Card, Checkbox, Dropdown } from '@/components/ui'
import { convertNumberToPercent } from '@/helpers/convertNumberToPercent'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrAccounting } from '@/utils/checkRole'
import { COLUMN_CONFIG } from '@/views/finance/reports/constants/financeReportColumnConfig.constant'
import { useProjectDailyStat } from '@/views/finance/reports/hooks/useProjectDailyStat'
import { useProjectDailyStatStore } from '@/views/finance/reports/store/useProjectDailyStatStore'
import { ProjectDailyStat, ProjectDailyStatSummary } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineViewList } from 'react-icons/hi'
import FinanceReportEditDialog from './FinanceReportEditDialog'

type Props = {
  showSummary?: boolean
}

export default function FinanceReportTable({ showSummary = false }: Props) {
  const { filters, setFilters } = useProjectDailyStatStore()
  const { user } = useAuthStore()

  const { data, isLoading } = useProjectDailyStat(filters)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProjectDailyStatId, setSelectedProjectDailyStatId] = useState<string | null>(null)

  const availableColumns = useMemo(() => {
    if (isAdminOrAccounting(user?.roles)) {
      return COLUMN_CONFIG
    }

    const restrictedColumns = [
      'profit',
      'roi',
      'holdRevenue',
      'receivedRevenue',
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
      'actions',
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

  const handleEditClick = useCallback((id: string) => {
    setSelectedProjectDailyStatId(id)
    setIsEditDialogOpen(true)
  }, [])

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false)
    setSelectedProjectDailyStatId(null)
  }, [])

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
              id: 'roi',
              header: 'ROI (%)',
              accessorKey: 'roi',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.roi)}</span>
              },
            },
            {
              id: 'holdRevenue',
              header: 'Doanh thu giữ lại',
              accessorKey: 'holdRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.holdRevenue)}</span>
              },
            },
            {
              id: 'receivedRevenue',
              header: 'Doanh thu nhận được',
              accessorKey: 'receivedRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.receivedRevenue)}</span>
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
                return <span>{convertNumberToPercent(row.rateRefPerClick)}</span>
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
                return <span>{convertNumberToPercent(row.costFtdPerRef)}</span>
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
                return <span>{convertNumberToPercent(row.totalClickPerVolume)}</span>
              },
            },
            {
              id: 'totalRefPerVolume',
              header: '% Ref đạt được',
              accessorKey: 'totalRefPerVolume',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.totalRefPerVolume)}</span>
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
      ...(isAdminOrAccounting(user?.roles)
        ? ([
            {
              id: 'actions',
              header: '',
              cell: (props) => {
                const row = props.row.original
                return (
                  <div className="flex justify-center">
                    <button type="button" onClick={() => handleEditClick(row.id)}>
                      <HiOutlinePencilAlt size={24} />
                    </button>
                  </div>
                )
              },
            },
          ] as ColumnDef<ProjectDailyStat>[])
        : []),
    ],
    [user?.roles, filters, handleEditClick],
  )

  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => columnVisibility[col.id as string])
  }, [allColumns, columnVisibility])

  const summaryColumns: ColumnDef<ProjectDailyStatSummary>[] = useMemo(
    () => [
      {
        header: 'STT',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filters.page - 1) * filters.limit + row + 1}</span>
        },
      },
      {
        header: 'Tên dự án',
        accessorKey: 'projectName',
      },
      {
        header: 'Tổng chi tiêu',
        accessorKey: 'totalCost',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.totalCost)}</span>
        },
      },
      {
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
      },
      {
        header: 'CPC trung bình',
        accessorKey: 'avgTargetCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.avgTargetCpc)}</span>
        },
      },
      ...(isAdminOrAccounting(user?.roles)
        ? ([
            {
              header: 'Hoa hồng',
              accessorKey: 'profit',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.profit)}</span>
              },
            },
            {
              header: 'ROI (%)',
              accessorKey: 'roi',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.roi)}</span>
              },
            },
            {
              header: 'Doanh thu giữ lại',
              accessorKey: 'holdRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.holdRevenue)}</span>
              },
            },
            {
              header: 'Doanh thu nhận được',
              accessorKey: 'receivedRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.receivedRevenue)}</span>
              },
            },
            {
              header: 'Tổng Ref',
              accessorKey: 'totalRef',
            },
            {
              header: 'Chi phí mỗi Ref',
              accessorKey: 'costPerRef',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.costPerRef)}</span>
              },
            },
            {
              header: 'Tỷ lệ Ref/Click (%)',
              accessorKey: 'rateRefPerClick',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.rateRefPerClick)}</span>
              },
            },
            {
              header: 'Số FTD',
              accessorKey: 'totalFtd',
            },
            {
              header: 'Chi phí mỗi FTD',
              accessorKey: 'costPerFtd',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.costPerFtd)}</span>
              },
            },
            {
              header: 'Tỷ lệ FTD/Ref (%)',
              accessorKey: 'rateFtdPerRef',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.rateFtdPerRef)}</span>
              },
            },
            {
              header: 'Volume key/ngày',
              accessorKey: 'totalTargetDailyKeyVolume',
            },
            {
              header: 'Dự tính Ref/ngày',
              accessorKey: 'totalTargetRef',
            },
            {
              header: '% Click đạt được',
              accessorKey: 'clickAchievementRate',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.clickAchievementRate)}</span>
              },
            },
            {
              header: '% Ref đạt được',
              accessorKey: 'refAchievementRate',
              cell: (props) => {
                const row = props.row.original
                return <span>{convertNumberToPercent(row.refAchievementRate)}</span>
              },
            },
          ] as ColumnDef<ProjectDailyStatSummary>[])
        : []),
    ],
    [filters, user?.roles],
  )

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
      {showSummary && (
        <Card header="Tổng quan dự án" className="mb-4">
          <DataTable columns={summaryColumns} data={data?.summary || []} loading={isLoading} />
        </Card>
      )}

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

      <FinanceReportEditDialog
        isOpen={isEditDialogOpen}
        projectDailyStatId={selectedProjectDailyStatId}
        onClose={handleCloseEditDialog}
      />
    </>
  )
}
