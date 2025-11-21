import { TaskStatisticResponse } from '@/views/tasks/assign/types/task.type'
import { useAuthStore } from '@/store/auth/useAuthStore'

type Props = {
  data: TaskStatisticResponse | undefined
}

export default function DashboardHeader({ data }: Props) {
  const { user } = useAuthStore()

  return (
    <div>
      <h4 className="mb-1">Xin chào, {`${user?.firstName} ${user?.lastName}`}!</h4>
      <p>Bạn có {data?.onGoing} công việc cần xử lý.</p>
    </div>
  )
}
