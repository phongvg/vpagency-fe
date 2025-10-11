import { Button } from '@/components/ui'
import UserManagementSearch from '@/views/system/userManagement/components/UserManagementSearch'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import { HiOutlineRefresh } from 'react-icons/hi'

export default function UserManagementTableTools() {
  const { clearFilter } = useUserStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <UserManagementSearch />
        <Button size="sm" onClick={clearFilter}>
          <HiOutlineRefresh />
        </Button>
      </div>
    </div>
  )
}
