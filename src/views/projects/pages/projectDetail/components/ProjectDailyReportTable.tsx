import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ProjectDailyReport } from '@/@types/projectDailyReport'
import { Avatar, ConfirmDialog } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import {
  useGetProjectDailyReportsQuery,
  useDeleteProjectDailyReportMutation,
} from '@/views/projects/pages/projectDetail/hooks/useProjectDailyReportQueries'

type ProjectDailyReportTableProps = {
  projectId: string
}

export default function ProjectDailyReportTable({ projectId }: ProjectDailyReportTableProps) {
  const { filter, setFilter, setDialogOpen, setSelectedReport } = useProjectDailyReportStore()
  const { data: getReportsResponse, isLoading } = useGetProjectDailyReportsQuery({
    ...filter,
    projectId,
  })
  const deleteMutation = useDeleteProjectDailyReportMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa báo cáo',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getReportsResponse?.meta, [getReportsResponse])

  const handleEdit = (row: ProjectDailyReport) => {
    setSelectedReport(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string, date: Date) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa báo cáo ngày ${formatDate(
        date,
        'DD/MM/YYYY',
      )}? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<ProjectDailyReport>[] = useMemo(
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
          return <span className="font-medium">{formatDate(row.date, 'DD/MM/YYYY')}</span>
        },
      },
      {
        header: 'Người chạy',
        accessorKey: 'runner',
        cell: (props) => {
          const row = props.row.original as any
          if (!row.runner) {
            return <span className="text-gray-400">Chưa có</span>
          }
          return (
            <div className="flex items-center gap-2">
              <Avatar size={28} shape="circle" src={row.runner.avatar ?? ''} />
              <span className="text-sm">
                {row.runner.firstName} {row.runner.lastName}
              </span>
            </div>
          )
        },
      },
      {
        header: 'Chi tiêu',
        accessorKey: 'totalSpent',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-blue-600">{formatVietnameseMoney(row.totalSpent)}</span>
        },
      },
      {
        header: 'Lượt click',
        accessorKey: 'totalClicks',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-green-600">{row.totalClicks.toLocaleString('vi-VN')}</span>
        },
      },
      {
        header: 'CPC',
        accessorKey: 'totalCpc',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-purple-600">{formatVietnameseMoney(row.totalCpc)}</span>
        },
      },
      {
        header: 'REF',
        accessorKey: 'totalRef',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-yellow-600">{row.totalRef.toLocaleString('vi-VN')}</span>
        },
      },
      {
        header: 'FTD',
        accessorKey: 'totalFtd',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-red-600">{row.totalFtd.toLocaleString('vi-VN')}</span>
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
        data={getReportsResponse?.items ?? []}
        skeletonAvatarColumns={[2]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
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
