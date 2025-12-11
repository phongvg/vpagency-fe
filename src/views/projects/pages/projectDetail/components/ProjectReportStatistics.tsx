import { Card } from '@/components/ui'
import { convertNumberToPercent } from '@/helpers/convertNumberToPercent'
import { formatUSD } from '@/helpers/formatUSD'
import { TotalStats } from '@/views/projects/pages/projectDetail/types/projectDetail.type'

type Props = {
  totalStats: TotalStats | undefined
}

export default function ProjectReportStatistics({ totalStats }: Props) {
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng chi tiêu</span>
          <span className="font-bold text-gray-700 text-2xl">{formatUSD(totalStats?.totalSpent || 0)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng lượt click</span>
          <span className="font-bold text-gray-700 text-2xl">{totalStats?.totalClicks || 0}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng lượt hiển thị</span>
          <span className="font-bold text-gray-700 text-2xl">{totalStats?.totalImpressions || 0}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">CPC trung bình</span>
          <span className="font-bold text-gray-700 text-2xl">{formatUSD(totalStats?.avgCpc || 0)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">CTR trung bình</span>
          <span className="font-bold text-gray-700 text-2xl">{convertNumberToPercent(totalStats?.avgCtr || 0)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng chiến dịch</span>
          <span className="font-bold text-gray-700 text-2xl">{totalStats?.totalCampaigns || 0}</span>
        </div>
      </Card>
    </div>
  )
}
