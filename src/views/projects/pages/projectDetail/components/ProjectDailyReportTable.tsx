import { ColumnDef, DataTable } from '@/components/shared'
import { formatUSD } from '@/helpers/formatUSD'
import ProjectReportStatistics from '@/views/projects/pages/projectDetail/components/ProjectReportStatistics'
import { useGetProjectStatisticQuery } from '@/views/projects/pages/projectDetail/hooks/useProjectDetail'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import { FinalURLStat } from '@/views/projects/pages/projectDetail/types/projectDetail.type'

type Props = {
  projectId: string
}

export default function ProjectDailyReportTable({ projectId }: Props) {
  const { filter } = useProjectDailyReportStore()
  const { data, isLoading } = useGetProjectStatisticQuery(projectId, filter)

  const columns: ColumnDef<FinalURLStat>[] = [
    {
      header: 'STT',
      cell: (props) => {
        return <span>{props.row.index + 1}</span>
      },
    },
    {
      accessorKey: 'finalUrlName',
      header: 'Tên URL',
    },
    {
      accessorKey: 'finalURL',
      header: 'URL',
      cell: (props) => (
        <a
          href={props.row.original.finalURL}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[200px] text-blue-600 underline truncate"
        >
          {props.row.original.finalURL}
        </a>
      ),
    },
    {
      accessorKey: 'totalSpent',
      header: 'Chi phí',
      cell: (props) => {
        return <span>{formatUSD(props.row.original.totalSpent)}</span>
      },
    },
    {
      accessorKey: 'totalClicks',
      header: 'Click',
    },
    {
      accessorKey: 'totalImpressions',
      header: 'Lượt hiển thị',
    },
    {
      accessorKey: 'avgCpc',
      header: 'CPC',
      cell: (props) => {
        return <span>{formatUSD(props.row.original.avgCpc)}</span>
      },
    },
    {
      accessorKey: 'avgCtr',
      header: 'CTR',
      cell: (props) => {
        const row = props.row.original.avgCtr
        return <span>{row}%</span>
      },
    },
    {
      accessorKey: 'totalCampaigns',
      header: 'Số chiến dịch',
    },
    {
      accessorKey: 'targets.targetRef',
      header: 'Mục tiêu Ref',
      cell: (props) => props.row.original.targets?.targetRef,
    },
    {
      accessorKey: 'targets.targetCostPerRef',
      header: 'Mục tiêu chi phí mỗi Ref',
      cell: (props) => formatUSD(props.row.original.targets?.targetCostPerRef || 0),
    },
    {
      accessorKey: 'targets.targetFtd',
      header: 'Mục tiêu FTD',
      cell: (props) => props.row.original.targets?.targetFtd,
    },
    {
      accessorKey: 'targets.targetCostPerFtd',
      header: 'Mục tiêu chi phí mỗi FTD',
      cell: (props) => formatUSD(props.row.original.targets?.targetCostPerFtd || 0),
    },
    {
      accessorKey: 'targets.budget',
      header: 'Ngân sách',
      cell: (props) => <span>{formatUSD(props.row.original.targets?.budget || 0)}</span>,
    },
    {
      accessorKey: 'targets.targetCpc',
      header: 'Mục tiêu CPC',
      cell: (props) => <span>{formatUSD(props.row.original.targets?.targetCpc || 0)}</span>,
    },
  ]

  const tableData = data?.finalUrlStats || []

  return (
    <div className="space-y-6">
      <ProjectReportStatistics totalStats={data?.totalStats} />
      <DataTable
        columns={columns}
        data={tableData}
        skeletonAvatarColumns={[2]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={isLoading}
        pagingData={undefined}
      />
    </div>
  )
}
