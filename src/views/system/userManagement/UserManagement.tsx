import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import UserManagementTable from '@/views/system/userManagement/components/UserManagementTable'
import UserManagementTableTools from '@/views/system/userManagement/components/UserManagementTableTools'

export default function UserManagement() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <UserManagementTableTools />
      <Card>
        <UserManagementTable />
      </Card>
    </AdaptableCard>
  )
}
