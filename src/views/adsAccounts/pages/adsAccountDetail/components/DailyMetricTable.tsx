import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { AdsAccountDailyMetric } from '@/@types/adsAccountDailyMetric'
import { ConfirmDialog } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useDailyMetricStore } from '@/views/adsAccounts/pages/adsAccountDetail/store/useDailyMetricStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import {
  useGetDailyMetricsQuery,
  useDeleteDailyMetricMutation,
} from '@/views/adsAccounts/pages/adsAccountDetail/hooks/useDailyMetricQueries'

type DailyMetricTableProps = {
  adsAccountId: string
}

export default function DailyMetricTable({ adsAccountId }: DailyMetricTableProps) {
  const { filter, setFilter, setDialogOpen, setSelectedMetric } = useDailyMetricStore()
  const { data: getDailyMetricsResponse, isLoading } = useGetDailyMetricsQuery({
    ...filter,
    adsAccountId,
  })
  const deleteMutation = useDeleteDailyMetricMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa chỉ số',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getDailyMetricsResponse?.meta, [getDailyMetricsResponse])

  const handleEdit = (row: AdsAccountDailyMetric) => {
    setSelectedMetric(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string, date: Date) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa chỉ số ngày ${formatDate(
        date,
        'DD/MM/YYYY',
      )}? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<AdsAccountDailyMetric>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filter.page! - 1) * filter.limit! + row + 1}</span>
        },
      },
      {
        header: 'Ngày',
        accessorKey: 'date',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.date, 'DD/MM/YYYY')}</span>
        },
      },
      {
        header: 'Lượt click',
        accessorKey: 'clicks',
      },
      {
        header: 'Chi tiêu',
        accessorKey: 'spent',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.spent)}</span>
        },
      },
      {
        header: 'CPC',
        accessorKey: 'cpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.cpc)}</span>
        },
      },
      {
        header: 'Ngày tạo',
        accessorKey: 'createdAt',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.createdAt, 'DD/MM/YYYY HH:mm')}</span>
        },
      },
      {
        header: '',
        accessorKey: 'action',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleEdit(row)} className="hover:text-blue-600">
                <HiOutlinePencilAlt size={20} />
              </button>
              <button type="button" onClick={() => handleDelete(row.id, row.date)} className="hover:text-red-600">
                <HiOutlineTrash size={20} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter.page, filter.limit, deleteMutation.isPending],
  )

  const onPaginationChange = (page: number) => {
    setFilter({ ...filter, page })
  }

  const onSelectChange = (value: number) => {
    setFilter({ ...filter, limit: value, page: 1 })
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={getDailyMetricsResponse?.items ?? []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <ConfirmDialog {...confirmProps} loading={deleteMutation.isPending} />
    </>
  )
}
