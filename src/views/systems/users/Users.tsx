import { AdaptableCard } from '@/components/shared'
import UserTable from '@/views/systems/users/components/UserTable'
import UserTableTools from '@/views/systems/users/components/UserTableTools'

export default function Users() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <UserTableTools />
      <UserTable />
    </AdaptableCard>
  )
}
