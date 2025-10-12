import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import UserTable from '@/views/system/userManagement/components/UserTable'
import UserTableTools from '@/views/system/userManagement/components/UserTableTools'

export default function UserManagement() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <UserTableTools />
      <Card>
        <UserTable />
      </Card>
    </AdaptableCard>
  )
}
