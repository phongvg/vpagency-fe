import { DataTable } from '@/components/shared'
import { Button, Card, Dialog } from '@/components/ui'
import { addDash } from '@/helpers/addDash'
import { convertNumberToPercent } from '@/helpers/convertNumberToPercent'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useGetProgressDetail } from '@/views/tasks/assign/hooks/useTask'
import { CampaignStat, UserStat } from '@/views/tasks/assign/types/task.type'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

type Props = {
  isOpen: boolean
  taskId: string | null
  onClose: () => void
}

export default function TaskProgressDetailModal({ isOpen, taskId, onClose }: Props) {
  const { data } = useGetProgressDetail(taskId, isOpen)

  const userColumns: ColumnDef<UserStat>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'Tên đăng nhập',
        accessorKey: 'username',
      },
      {
        header: 'Họ và tên',
        accessorKey: 'firstName',
        cell: (props) => {
          const row = props.row.original
          return (
            <span>
              {row.firstName} {row.lastName}
            </span>
          )
        },
      },
      {
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
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
        header: 'Tổng lượt hiển thị',
        accessorKey: 'totalImpression',
      },
      {
        header: 'CPC trung bình',
        accessorKey: 'avgCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.avgCpc)}</span>
        },
      },
      {
        header: 'Tổng chiến dịch',
        accessorKey: 'campaignCount',
      },
    ],
    [],
  )

  const campaignColumns: ColumnDef<CampaignStat>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'UID',
        accessorKey: 'uid',
        cell: (props) => {
          const row = props.row.original
          return <span className="whitespace-nowrap">{addDash(row.uid)}</span>
        },
      },
      {
        header: 'Chiến dịch',
        accessorKey: 'campaignName',
      },
      {
        header: 'ID chiến dịch',
        accessorKey: 'externalId',
      },
      {
        header: 'Người phụ trách (Tên đăng nhập)',
        accessorKey: 'ownerUsername',
      },
      {
        header: 'Gmail',
        accessorKey: 'gmail',
      },
      {
        header: 'Ngày dữ liệu',
        accessorKey: 'date',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.date, 'DD/MM/YYYY')}</span>
        },
      },
      {
        header: 'Click',
        accessorKey: 'clicks',
      },
      {
        header: 'Ngân sách đã tiêu',
        accessorKey: 'cost',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.cost)}</span>
        },
      },
      {
        header: 'Lượt hiển thị',
        accessorKey: 'impression',
      },
      {
        header: 'CTR',
        accessorKey: 'ctr',
        cell: (props) => {
          const row = props.row.original
          return <span>{convertNumberToPercent(row.ctr)}</span>
        },
      },
      {
        header: 'CPM',
        accessorKey: 'cpm',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.cpm}</span>
        },
      },
      {
        header: 'CPC trung bình',
        accessorKey: 'avgCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.avgCpc)}</span>
        },
      },
      {
        header: 'Mục tiêu CPC',
        accessorKey: 'targetCpc',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.targetCpc)}</span>
        },
      },
      {
        header: 'Ngân sách chiến dịch',
        accessorKey: 'campaignBudget',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.campaignBudget)}</span>
        },
      },
    ],
    [],
  )

  return (
    <Dialog isOpen={isOpen} width={1400} className="max-w-[1400px]" onClose={onClose} onRequestClose={onClose}>
      <h3 className="mb-6 font-semibold text-gray-900 text-lg">Chi tiết tiến độ công việc</h3>
      <div className="space-y-6">
        {data?.finalUrls.map((finalUrl) => (
          <div key={finalUrl.id} className="gap-4 grid grid-cols-3">
            <Card className="col-span-1 min-h-[320px] max-h-[320px]" header="Thông tin URL">
              <h5>{finalUrl.name}</h5>
              <a
                href={finalUrl.finalURL}
                className="block mt-2 text-blue-600 text-sm hover:underline truncate"
                target="_blank"
                rel="noopener noreferrer"
                title={finalUrl.finalURL}
              >
                {finalUrl.finalURL}
              </a>
              <hr className="my-5" />
              <h6 className="mb-3">Chỉ số</h6>
              <div className="gap-4 grid grid-cols-2 text-sm">
                <div>
                  <span>Mục tiêu Ref:</span>
                  <span className="ml-1 font-medium">{finalUrl.targetRef}</span>
                </div>

                <div>
                  <span>Mục tiêu Ftd:</span>
                  <span className="ml-1 font-medium">{finalUrl.targetFtd}</span>
                </div>

                <div>
                  <span>Mục tiêu chi phí Ref:</span>
                  <span className="ml-1 font-medium">{finalUrl.targetCostPerRef}</span>
                </div>

                <div>
                  <span>Mục tiêu chi phí Ftd:</span>
                  <span className="ml-1 font-medium">{finalUrl.targetCostPerFtd}</span>
                </div>

                <div>
                  <span>Mục tiêu CPC:</span>
                  <span className="ml-1 font-medium">{finalUrl.targetCpc}</span>
                </div>
              </div>
            </Card>
            <Card className="col-span-2 min-h-[320px] max-h-[320px]" header="Thống kê người dùng">
              <DataTable columns={userColumns} data={finalUrl.userStats} maxHeight={320} />
            </Card>
            <Card className="col-span-3" header="Thống kê chiến dịch">
              <DataTable columns={campaignColumns} data={finalUrl.campaignStats} />
            </Card>
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <Button variant="default" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
