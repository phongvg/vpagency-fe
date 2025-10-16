import { Button } from '@/components/ui'
import UserSearch from '@/views/systems/users/components/UserSearch'
import { useUserStore } from '@/views/systems/users/store/useUserStore'
import { HiOutlineRefresh } from 'react-icons/hi'

export default function UserTableTools() {
  const { clearFilter } = useUserStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <UserSearch />
        <Button size="sm" onClick={clearFilter}>
          <HiOutlineRefresh />
        </Button>
      </div>
    </div>
  )
}
