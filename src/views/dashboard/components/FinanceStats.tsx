import { FinanceStats as FinanceStatsType } from '@/@types/statistic'
import Chart from '@/components/shared/Chart'
import { Card, Progress } from '@/components/ui'
import { formatUSD } from '@/helpers/formatUSD'
import { isEmpty } from 'lodash'
import { NumericFormat } from 'react-number-format'

type Props = {
  data: FinanceStatsType | undefined
}

const FinanceStatsCard = ({ title, value }: { title: string; value: string | number | undefined }) => {
  return (
    <Card>
      <div className="flex flex-col">
        <span className="mb-2 font-semibold text-gray-600 text-sm">{title}</span>
        <span className="font-bold text-gray-700 text-2xl">{value}</span>
      </div>
    </Card>
  )
}

const ProgressInfo = ({ precent }: { precent?: number }) => {
  return (
    <div>
      <h3 className="font-bold">{precent}%</h3>
    </div>
  )
}

export default function FinanceStats({ data }: Props) {
  const fakeData = {
    series: [
      {
        name: 'Tổng chi tiêu',
        data: [
          14576.39, 23895.12, 19473.64, 26454.96, 24741.98, 33153.32, 30218.32, 37645.11, 35556.15, 38886.34, 36135.95,
          45966.12,
        ],
      },
    ],
    timeRange: [
      '2 Tháng 11',
      '5 Tháng 11',
      '7 Tháng 11',
      '10 Tháng 11',
      '12 Tháng 11',
      '15 Tháng 11',
      '17 Tháng 11',
      '20 Tháng 11',
      '22 Tháng 11',
      '25 Tháng 11',
      '27 Tháng 11',
      '30 Tháng 11',
    ],
  }

  return (
    <>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-2">
          <FinanceStatsCard title="Tổng dự án" value={data?.totalProjects} />
          <FinanceStatsCard title="Dự án đang hoạt động" value={data?.activeProjects} />
          <FinanceStatsCard title="Công việc" value={data?.totalTasks} />
          <FinanceStatsCard title="Công việc hoàn thành hôm nay" value={data?.completedTasksToday} />
          <FinanceStatsCard title="Tổng chi tiêu hôm nay" value={formatUSD(data?.todaySpent)} />
          <FinanceStatsCard title="Tổng chi tiêu" value={formatUSD(data?.totalSpent)} />
        </div>

        <Card>
          <h4 className="mb-2">Tỷ lệ dự án hoạt động</h4>
          <p className="text-gray-500 text-sm">
            {data?.activeProjects || 0} / {data?.totalProjects || 0} dự án đang chạy
          </p>
          <div className="mt-6">
            <Progress
              variant="circle"
              percent={data?.activeProjects ? Math.round((data.activeProjects / data?.totalProjects) * 100) : 0}
              width={200}
              className="flex justify-center"
              strokeWidth={4}
              customInfo={
                <ProgressInfo
                  precent={data?.activeProjects ? Math.round((data.activeProjects / data?.totalProjects) * 100) : 0}
                />
              }
            />
          </div>
          <div className="mt-6 text-center">
            <p className="font-semibold text-gray-600">Hiệu suất dự án</p>
            <h4 className="font-bold text-gray-700">
              {data?.activeProjects && data?.totalProjects
                ? data.activeProjects === data.totalProjects
                  ? 'Xuất sắc'
                  : Math.round((data.activeProjects / data.totalProjects) * 100) >= 70
                    ? 'Tốt'
                    : Math.round((data.activeProjects / data.totalProjects) * 100) >= 50
                      ? 'Trung bình'
                      : 'Cần cải thiện'
                : 'Chưa có dữ liệu'}
            </h4>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-6">
          <div>
            <p>Tổng chi tiêu tháng 11</p>
            <h4 className="font-bold">
              {!isEmpty(data) && <NumericFormat thousandSeparator displayType="text" value={1000000} suffix="₫" />}
            </h4>
          </div>
        </div>
        {!isEmpty(data) && (
          <Chart
            series={fakeData?.series}
            xAxis={fakeData?.timeRange}
            height="350px"
            customOptions={{ legend: { show: false } }}
          />
        )}
      </Card>
    </>
  )
}
