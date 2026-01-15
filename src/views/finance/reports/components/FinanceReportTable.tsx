import { DataTable, DataTableResetHandle } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Button, Card, Checkbox, ConfirmDialog, Dropdown } from '@/components/ui'
import { fixedNumber } from '@/helpers/fixedNumber'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrAccounting } from '@/utils/checkRole'
import { toastError, toastSuccess } from '@/utils/toast'
import { COLUMN_CONFIG } from '@/views/finance/reports/constants/financeReportColumnConfig.constant'
import {
  useDeleteProjectDailyStatMutation,
  useProjectDailyStat,
} from '@/views/finance/reports/hooks/useProjectDailyStat'
import { useProjectDailyStatStore } from '@/views/finance/reports/store/useProjectDailyStatStore'
import { ProjectDailyStat, ProjectDailyStatSummary } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { ColumnDef, Row } from '@tanstack/react-table'
import { useCallback, useMemo, useRef, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'
import FinanceReportEditDialog from './FinanceReportEditDialog'

type Props = {
  showSummary?: boolean
}

type StatCardProps = {
  label: string
  value: string | number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-indigo-600">{value}</div>
    </div>
  )
}

export default function FinanceReportTable({ showSummary = false }: Props) {
  const { filters, setFilters } = useProjectDailyStatStore()
  const { user } = useAuthStore()

  const { data, isLoading } = useProjectDailyStat(filters)
  const { mutateAsync: deleteReport, isPending: isDeleting } = useDeleteProjectDailyStatMutation()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProjectDailyStatId, setSelectedProjectDailyStatId] = useState<string | null>(null)
  const [selectedSummaryRows, setSelectedSummaryRows] = useState<ProjectDailyStatSummary[]>([])

  const summaryTableRef = useRef<DataTableResetHandle>(null)

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xóa báo cáo tài chính',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

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

  const handleDeleteClick = useCallback(
    async (id: string, projectName: string, date: string) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa báo cáo "${projectName}" ngày ${formatDate(date, 'DD/MM/YYYY')}?`,
      })

      if (confirmed) {
        try {
          await deleteReport(id)
          toastSuccess('Xóa báo cáo thành công')
        } catch (error: any) {
          toastError(error?.response?.data?.message || 'Xóa báo cáo thất bại')
        }
      }
    },
    [showConfirm, deleteReport],
  )

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
      {
        id: 'projectStatus',
        header: 'Trạng thái dự án',
        accessorKey: 'projectStatus',
        cell: (props) => <BadgeStatus content={props.row.original.projectStatus} />,
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
                return <span>{fixedNumber(row.roi)}%</span>
              },
            },
            {
              id: 'holdRevenue',
              header: 'Hoa hồng tạm giữ',
              accessorKey: 'holdRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.holdRevenue)}</span>
              },
            },
            {
              id: 'receivedRevenue',
              header: 'Hoa hồng rút về',
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
                return <span>{fixedNumber(row.rateRefPerClick)}%</span>
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
                return <span>{fixedNumber(row.costFtdPerRef)}%</span>
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
                return <span>{fixedNumber(row.totalClickPerVolume)}%</span>
              },
            },
            {
              id: 'totalRefPerVolume',
              header: '% Ref đạt được',
              accessorKey: 'totalRefPerVolume',
              cell: (props) => {
                const row = props.row.original
                return <span>{fixedNumber(row.totalRefPerVolume)}%</span>
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
                  <div className="flex justify-center gap-2">
                    <button type="button" title="Sửa" onClick={() => handleEditClick(row.id)}>
                      <HiOutlinePencilAlt size={24} className="text-blue-600 hover:text-blue-800" />
                    </button>
                    <button
                      type="button"
                      title="Xóa"
                      onClick={() =>
                        handleDeleteClick(
                          row.id,
                          row.projectName,
                          row.date instanceof Date ? row.date.toISOString() : String(row.date),
                        )
                      }
                    >
                      <HiOutlineTrash size={24} className="text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                )
              },
            },
          ] as ColumnDef<ProjectDailyStat>[])
        : []),
    ],
    [user?.roles, filters, handleEditClick, handleDeleteClick],
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
              header: 'Lợi nhuận',
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
                return <span>{fixedNumber(row.roi)}%</span>
              },
            },
            {
              header: 'Hoa hồng tạm giữ',
              accessorKey: 'holdRevenue',
              cell: (props) => {
                const row = props.row.original
                return <span>{formatUSD(row.holdRevenue)}</span>
              },
            },
            {
              header: 'Hoa hồng rút về',
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
                return <span>{fixedNumber(row.rateRefPerClick)}%</span>
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
                return <span>{fixedNumber(row.rateFtdPerRef)}%</span>
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
                return <span>{fixedNumber(row.clickAchievementRate)}%</span>
              },
            },
            {
              header: '% Ref đạt được',
              accessorKey: 'refAchievementRate',
              cell: (props) => {
                const row = props.row.original
                return <span>{fixedNumber(row.refAchievementRate)}%</span>
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

  const handleSummaryCheckBoxChange = (checked: boolean, row: ProjectDailyStatSummary) => {
    if (checked) {
      setSelectedSummaryRows([...selectedSummaryRows, row])
    } else {
      setSelectedSummaryRows(selectedSummaryRows.filter((r) => r.projectName !== row.projectName))
    }
  }

  const handleSummaryIndeterminateCheckBoxChange = (checked: boolean, rows: Row<ProjectDailyStatSummary>[]) => {
    if (checked) {
      setSelectedSummaryRows(rows.map((r) => r.original))
    } else {
      setSelectedSummaryRows([])
    }
  }

  const totalStats = useMemo(() => {
    if (!data?.summary || data.summary.length === 0) {
      return {
        totalCost: 0,
        totalClicks: 0,
        avgCpc: 0,
        totalProfit: 0,
        avgRoi: 0,
        totalHoldRevenue: 0,
        totalReceivedRevenue: 0,
        totalRef: 0,
        avgCostPerRef: 0,
        avgRateRefPerClick: 0,
        totalFtd: 0,
        avgCostPerFtd: 0,
        avgRateFtdPerRef: 0,
        totalTargetDailyKeyVolume: 0,
        totalTargetRef: 0,
        avgClickAchievementRate: 0,
        avgRefAchievementRate: 0,
      }
    }

    // Nếu có dòng được chọn thì tính theo dòng được chọn, nếu không thì tính tất cả
    const summary = selectedSummaryRows.length > 0 ? selectedSummaryRows : data.summary
    const count = summary.length

    const totalCost = summary.reduce((sum, item) => sum + (item.totalCost || 0), 0)
    const totalClicks = summary.reduce((sum, item) => sum + (item.totalClicks || 0), 0)
    const totalProfit = summary.reduce((sum, item) => sum + (item.profit || 0), 0)
    const totalRef = summary.reduce((sum, item) => sum + (item.totalRef || 0), 0)
    const totalFtd = summary.reduce((sum, item) => sum + (item.totalFtd || 0), 0)

    return {
      totalCost,
      totalClicks,
      avgCpc: totalClicks > 0 ? totalCost / totalClicks : 0,
      totalProfit,
      avgRoi: totalCost > 0 ? (totalProfit / totalCost) * 100 : 0,
      totalHoldRevenue: summary.reduce((sum, item) => sum + (item.holdRevenue || 0), 0),
      totalReceivedRevenue: summary.reduce((sum, item) => sum + (item.receivedRevenue || 0), 0),
      totalRef,
      avgCostPerRef: totalRef > 0 ? totalCost / totalRef : 0,
      avgRateRefPerClick: totalClicks > 0 ? (totalRef / totalClicks) * 100 : 0,
      totalFtd,
      avgCostPerFtd: totalFtd > 0 ? totalCost / totalFtd : 0,
      avgRateFtdPerRef: totalRef > 0 ? (totalFtd / totalRef) * 100 : 0,
      totalTargetDailyKeyVolume: summary.reduce((sum, item) => sum + (item.totalTargetDailyKeyVolume || 0), 0),
      totalTargetRef: summary.reduce((sum, item) => sum + (item.totalTargetRef || 0), 0),
      avgClickAchievementRate: summary.reduce((sum, item) => sum + (item.clickAchievementRate || 0), 0) / count,
      avgRefAchievementRate: summary.reduce((sum, item) => sum + (item.refAchievementRate || 0), 0) / count,
    }
  }, [data?.summary, selectedSummaryRows])

  return (
    <>
      {showSummary && (
        <Card header="Tổng quan dự án" className="mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            <StatCard label="Tổng chi tiêu" value={formatUSD(totalStats.totalCost)} />
            <StatCard label="Tổng lượt click" value={totalStats.totalClicks.toLocaleString()} />
            <StatCard label="CPC trung bình" value={formatUSD(totalStats.avgCpc)} />

            {isAdminOrAccounting(user?.roles) && (
              <>
                <StatCard label="Lợi nhuận" value={formatUSD(totalStats.totalProfit)} />
                <StatCard label="ROI trung bình" value={`${fixedNumber(totalStats.avgRoi)}%`} />
                <StatCard label="Hoa hồng tạm giữ" value={formatUSD(totalStats.totalHoldRevenue)} />
                <StatCard label="Hoa hồng rút về" value={formatUSD(totalStats.totalReceivedRevenue)} />
                <StatCard label="Tổng Ref" value={totalStats.totalRef.toLocaleString()} />
                <StatCard label="Chi phí/Ref TB" value={formatUSD(totalStats.avgCostPerRef)} />
                <StatCard label="Tỷ lệ Ref/Click TB" value={`${fixedNumber(totalStats.avgRateRefPerClick)}%`} />
                <StatCard label="Tổng FTD" value={totalStats.totalFtd.toLocaleString()} />
                <StatCard label="Chi phí/FTD TB" value={formatUSD(totalStats.avgCostPerFtd)} />
                <StatCard label="Tỷ lệ FTD/Ref TB" value={`${fixedNumber(totalStats.avgRateFtdPerRef)}%`} />
                <StatCard label="Volume key/ngày" value={totalStats.totalTargetDailyKeyVolume.toLocaleString()} />
                <StatCard label="Dự tính Ref/ngày" value={totalStats.totalTargetRef.toLocaleString()} />
                <StatCard label="% Click đạt được TB" value={`${fixedNumber(totalStats.avgClickAchievementRate)}%`} />
                <StatCard label="% Ref đạt được TB" value={`${fixedNumber(totalStats.avgRefAchievementRate)}%`} />
              </>
            )}
          </div>

          {selectedSummaryRows.length > 0 && (
            <div className="flex items-center gap-4 bg-blue-50 mb-4 p-4 rounded">
              <span className="font-medium">Đã chọn {selectedSummaryRows.length} dự án để tính toán</span>
              <Button
                size="sm"
                onClick={() => {
                  summaryTableRef.current?.resetSelected()
                  setSelectedSummaryRows([])
                }}
              >
                Bỏ chọn
              </Button>
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto">
            <DataTable
              ref={summaryTableRef}
              selectable
              columns={summaryColumns}
              data={data?.summary || []}
              loading={isLoading}
              getRowId={(row) => row.projectName}
              onCheckBoxChange={handleSummaryCheckBoxChange}
              onIndeterminateCheckBoxChange={handleSummaryIndeterminateCheckBoxChange}
            />
          </div>
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

      <ConfirmDialog {...confirmProps} loading={isDeleting} />
    </>
  )
}
