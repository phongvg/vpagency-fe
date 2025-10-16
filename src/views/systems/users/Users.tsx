import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import UserTable from '@/views/systems/users/components/UserTable'
import UserTableTools from '@/views/systems/users/components/UserTableTools'

export default function Users() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <UserTableTools />
      <Card>
        <UserTable />
      </Card>
    </AdaptableCard>
  )
}
