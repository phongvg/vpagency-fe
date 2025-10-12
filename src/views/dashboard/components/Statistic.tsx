import { UserStatisticResponse } from '@/@types/statistic'
import { Avatar, Card } from '@/components/ui'
import { HiUser } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'

interface StatisticProps {
  data?: UserStatisticResponse
}

interface StatisticCardProps {
  title: string
  value: number
  icon: React.ReactNode
}

const StatisticCard = (props: StatisticCardProps) => {
  const { title, value, icon } = props

  return (
    <Card>
      <div className="flex items-center gap-4">
        <Avatar className="bg-blue-100 text-blue-600" size="lg" icon={icon} />
        <div>
          <h6 className="mb-4 font-semibold text-sm">{title}</h6>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">
                <NumericFormat
                  thousandSeparator
                  displayType="text"
                  value={value}
                />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Statistic(props: StatisticProps) {
  const { data } = props

  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-4">
      <StatisticCard
        title="Tài khoản hệ thống"
        value={data?.total || 0}
        icon={<HiUser />}
      />
      <StatisticCard
        title="Tài khoản mới gia nhập"
        value={data?.byStatus.onboarding || 0}
        icon={<HiUser />}
      />
      <StatisticCard
        title="Tài khoản hoạt động"
        value={data?.byStatus.active || 0}
        icon={<HiUser />}
      />
      <StatisticCard
        title="Tài khoản bị khóa"
        value={data?.byStatus.inactive || 0}
        icon={<HiUser />}
      />
    </div>
  )
}
