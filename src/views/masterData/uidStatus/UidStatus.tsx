import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import UidStatusTable from '@/views/masterData/uidStatus/components/UidStatusTable'
import UidStatusTableTools from '@/views/masterData/uidStatus/components/UidStatusTableTools'

export default function UidStatus() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <UidStatusTableTools />
      <Card>
        <UidStatusTable />
      </Card>
    </AdaptableCard>
  )
}
