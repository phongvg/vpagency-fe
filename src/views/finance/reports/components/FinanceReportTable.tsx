import { useCallback, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared'
import { formatUSD } from '@/helpers/formatUSD'
import { ProjectDailyStat } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { useProjectDailyStat } from '@/views/finance/reports/hooks/useProjectDailyStat'
import { useProjectDailyStatStore } from '@/views/finance/reports/store/useProjectDailyStatStore'
import { LocationStat } from '@/views/campaign/types/campaign.type'
import { formatDate } from '@/helpers/formatDate'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { HiOutlineDuplicate } from 'react-icons/hi'
import { toastError, toastSuccess } from '@/utils/toast'
import { isAdminOrAccounting } from '@/utils/checkRole'
import { useAuthStore } from '@/store/auth/useAuthStore'

export default function FinanceReportTable() {
  const { filters, setFilters } = useProjectDailyStatStore()
  const { user } = useAuthStore()

  const { data, isLoading } = useProjectDailyStat(filters)

  const metaTableData = useMemo(() => data?.meta, [data?.meta])

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toastSuccess('Đã sao chép vào clipboard')
      },
      () => {
        toastError('Sao chép thất bại')
      },
    )
  }, [])

  const columns: ColumnDef<ProjectDailyStat>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'Ngày',
        accessorKey: 'date',
        cell: (props) => {
          const value = props.getValue() as string
          return <span>{formatDate(value, 'DD/MM/YYYY')}</span>
        },
      },
      ...(isAdminOrAccounting(user?.roles)
        ? ([
            {
              header: 'Lợi nhuận',
              accessorKey: 'profit',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{formatUSD(value)}</span>
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
                const value = props.getValue() as number
                return <span>{formatUSD(value)}</span>
              },
            },
            {
              header: 'Tỷ lệ Ref/Click (%)',
              accessorKey: 'rateRefPerClick',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{value?.toFixed(2)}%</span>
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
                const value = props.getValue() as number
                return <span>{formatUSD(value)}</span>
              },
            },
            {
              header: 'Tỷ lệ FTD/Ref (%)',
              accessorKey: 'costFtdPerRef',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{value?.toFixed(2)}%</span>
              },
            },
            {
              header: 'Volume key/ngày',
              accessorKey: 'totalTargetDailyKeyVolume',
            },
            {
              header: 'Dự tính Ref/ngày',
              accessorKey: 'totalTargetRef',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{value?.toLocaleString('vi-VN')}</span>
              },
            },
            {
              header: '% click đạt được',
              accessorKey: 'totalClickPerVolume',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{value?.toFixed(2)}%</span>
              },
            },
            {
              header: '% Ref đạt được',
              accessorKey: 'totalRefPerVolume',
              cell: (props) => {
                const value = props.getValue() as number
                return <span>{value?.toFixed(2)}%</span>
              },
            },
          ] as ColumnDef<ProjectDailyStat>[])
        : []),
      {
        header: 'Tổng chi tiêu',
        accessorKey: 'totalCost',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
      },
      {
        header: 'CPC trung bình',
        cell: (props) => {
          const row = props.row.original
          const avgCpc = row.totalClicks > 0 ? row.totalCost / row.totalClicks : 0
          return <span>{formatUSD(avgCpc)}</span>
        },
      },
      {
        header: 'Thầu',
        accessorKey: 'totalTargetCpc',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Quốc gia đang cắn',
        accessorKey: 'activeCountries',
        cell: (props) => {
          const countries = props.getValue() as LocationStat[]
          if (countries.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={countries.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(countries.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
    ],
    [handleCopyToClipboard, user?.roles],
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
    <DataTable
      columns={columns}
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
  )
}
