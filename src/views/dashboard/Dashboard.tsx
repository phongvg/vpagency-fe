import { Loading } from '@/components/shared'
import Statistic from '@/views/dashboard/components/Statistic'
import { useUserStatisticQuery } from '@/views/dashboard/hooks/useStatisticQueries'

export default function Dashboard() {
  const { data: userStatisticResponse, isLoading } = useUserStatisticQuery()

  return (
    <>
      <Loading loading={isLoading}>
        <Statistic data={userStatisticResponse} />
      </Loading>
    </>
  )
}
