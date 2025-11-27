import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ProjectDailyReport } from '@/@types/projectDailyReport'
import { Avatar } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { formatUSD } from '@/helpers/formatUSD'
import { formatDate } from '@/helpers/formatDate'
import { useGetProjectDailyReportsQuery } from '@/views/projects/pages/projectDetail/hooks/useProjectDailyReport'

type ProjectDailyReportTableProps = {
  projectId: string
}

export default function ProjectDailyReportTable({ projectId }: ProjectDailyReportTableProps) {
  const { filter, setFilter, setDialogOpen, setSelectedReport } = useProjectDailyReportStore()
  const { data: getReportsResponse, isLoading } = useGetProjectDailyReportsQuery({
    ...filter,
    projectId,
  })

  const metaTableData = useMemo(() => getReportsResponse?.meta, [getReportsResponse])

  const handleEdit = (row: ProjectDailyReport) => {
    setSelectedReport(row)
    setDialogOpen(true)
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
          return <span className="font-semibold text-blue-600">{formatUSD(row.totalSpent)}</span>
        },
      },
      {
        header: 'Lượt click',
        accessorKey: 'totalClicks',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-green-600">{row.totalClicks}</span>
        },
      },
      {
        header: 'CPC',
        accessorKey: 'totalCpc',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-purple-600">{formatUSD(row.totalCpc)}</span>
        },
      },
      {
        header: 'REF',
        accessorKey: 'totalRef',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-yellow-600">{row.totalRef}</span>
        },
      },
      {
        header: 'FTD',
        accessorKey: 'totalFtd',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-semibold text-red-600">{row.totalFtd}</span>
        },
      },
      {
        header: '',
        accessorKey: 'action',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex justify-end items-center gap-4">
              <button type="button" className="hover:text-blue-600" onClick={() => handleEdit(row)}>
                <HiOutlinePencilAlt size={20} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, handleEdit],
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
    </>
  )
}
