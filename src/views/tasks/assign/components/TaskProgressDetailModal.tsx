import { DataTable } from '@/components/shared'
import { Button, Card, Dialog } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { CampaignStat, FinalUrl } from '@/views/projects/types/finalUrl.type'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

type Props = {
  isOpen: boolean
  finalUrls: FinalUrl[]
  onClose: () => void
}

export default function TaskProgressDetailModal({ isOpen, finalUrls, onClose }: Props) {
  const columns: ColumnDef<CampaignStat>[] = useMemo(
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
        header: 'Chiến dịch',
        accessorKey: 'name',
      },
      {
        header: 'ID chiến dịch',
        accessorKey: 'externalId',
      },
      {
        header: 'UID',
        accessorKey: 'uid',
      },
      {
        header: 'Gmail ID',
        accessorKey: 'gmailId',
      },
      {
        header: 'Ngày dữ liệu',
        accessorKey: 'latestStat.date',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.latestStat.date, 'DD/MM/YYYY')}</span>
        },
      },
      {
        header: 'Click',
        accessorKey: 'latestStat.clicks',
      },
      {
        header: 'Ngân sách đã tiêu',
        accessorKey: 'latestStat.spent',
      },
      {
        header: 'Lượt hiển thị',
        accessorKey: 'latestStat.impression',
      },
      {
        header: 'CTR',
        accessorKey: 'latestStat.ctr',
      },
      {
        header: 'CPC',
        accessorKey: 'latestStat.cpc',
      },
    ],
    [],
  )

  return (
    <Dialog isOpen={isOpen} width={1400} className="max-w-[1400px]" onClose={onClose} onRequestClose={onClose}>
      <h3 className="mb-6 font-semibold text-gray-900 text-lg">Chi tiết tiến độ công việc</h3>
      <div className="space-y-6">
        {finalUrls.map((finalUrl) => (
          <div key={finalUrl.id} className="gap-4 grid grid-cols-3">
            <Card className="col-span-1">
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
            <Card className="col-span-2">
              <DataTable columns={columns} data={finalUrl.campaigns} loading={false} pagingData={undefined} />
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
