import { TaskStatisticResponse } from '@/@types/task'
import { Badge, Card } from '@/components/ui'
import { isEmpty } from 'lodash'
import { COLORS } from '@/constants/chart.constant'
import Chart from '@/components/shared/Chart'

type Props = {
  data: TaskStatisticResponse | undefined
}

type ChartLegendProps = {
  label: string
  value: number
  badgeClass?: string
  showBadge?: boolean
}

const ChartLegend = ({ label, value, badgeClass, showBadge = true }: ChartLegendProps) => {
  return (
    <div className="flex gap-2">
      {showBadge && <Badge className="mt-2.5" innerClass={badgeClass} />}
      <div>
        <h5 className="font-bold">{value}</h5>
        <p>{label}</p>
      </div>
    </div>
  )
}

export default function TaskOverview({ data }: Props) {
  return (
    <Card>
      <div className="flex sm:flex-row flex-col justify-between md:items-center gap-4 mb-6">
        <h4>Tổng quan công việc 7 ngày gần nhất</h4>
      </div>
      {!isEmpty(data) && data && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <ChartLegend showBadge={false} label="Công việc" value={data.total} />
            </div>
            <div className="flex gap-x-6">
              <ChartLegend badgeClass="bg-yellow-500" label={data.series[0].name} value={data.onGoing} />
              <ChartLegend badgeClass="bg-emerald-500" label={data.series[1].name} value={data.finished} />
              <ChartLegend badgeClass="bg-red-500" label={data.series[2].name} value={data.delayed} />
            </div>
          </div>
          <div>
            <Chart
              series={data.series}
              xAxis={data.range}
              type="bar"
              customOptions={{
                colors: [COLORS[0], COLORS[1], COLORS[2]],
                legend: { show: false },
              }}
            />
          </div>
        </>
      )}
    </Card>
  )
}
