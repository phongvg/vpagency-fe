import { AdaptableCard } from '@/components/shared'
import Board from '@/views/tasks/assign/components/Board'

export default function AssignTask() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <Board />
    </AdaptableCard>
  )
}
