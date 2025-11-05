import { useMemo, useState } from 'react'
import { ProjectReports, ProjectReportsFilterRequest } from '@/@types/statistic'
import { useProjectReportStatisticQuery } from '@/views/dashboard/hooks/useStatisticQueries'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdmin } from '@/utils/checkRole'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/helpers/formatDate'
import { Avatar, Card } from '@/components/ui'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { DataTable } from '@/components/shared'

export default function ProjectDailyReports() {
  const { user } = useAuthStore()

  const [filters, setFilters] = useState<ProjectReportsFilterRequest>({
    search: '',
    page: 1,
    limit: 10,
    projectId: '',
    runnerId: '',
  })

  const { data, isLoading } = useProjectReportStatisticQuery(filters, isAdmin(user?.roles))

  const onPaginationChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const onSelectChange = (value: number) => {
    setFilters({ ...filters, limit: value, page: 1 })
  }

  const columns: ColumnDef<ProjectReports>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filters.page! - 1) * filters.limit! + row + 1}</span>
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
        header: 'Link triển khai',
        accessorKey: 'linkDeployed',
        cell: (props) => {
          const row = props.row.original
          return (
            <a href={row.linkDeployed ?? undefined} target="_blank" className="font-medium">
              {row.linkDeployed}
            </a>
          )
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
        header: 'Tổng chi tiêu',
        accessorKey: 'totalSpent',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.totalSpent)}</span>
        },
      },
      {
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.totalClicks}</span>
        },
      },
      {
        header: 'Tổng CPC',
        accessorKey: 'totalCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.totalCpc)}</span>
        },
      },
      {
        header: 'CPC cao nhất',
        accessorKey: 'highestCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.highestCpc)}</span>
        },
      },
      {
        header: 'Chi phí mỗi REF',
        accessorKey: 'costPerRef',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.costPerRef}</span>
        },
      },
      {
        header: 'Tổng REF',
        accessorKey: 'totalRef',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.totalRef}</span>
        },
      },
      {
        header: 'Chi phí mỗi FTD',
        accessorKey: 'costPerFtd',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.costPerFtd}</span>
        },
      },
      {
        header: 'Tổng FTD',
        accessorKey: 'totalFtd',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.totalFtd}</span>
        },
      },
    ],
    [filters.page, filters.limit, data],
  )

  return (
    <Card header="Báo cáo tiến độ hàng ngày của dự án">
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        skeletonAvatarColumns={[2]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={isLoading}
        pagingData={{
          total: data?.meta.total as number,
          pageIndex: data?.meta.page as number,
          pageSize: data?.meta.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </Card>
  )
}
