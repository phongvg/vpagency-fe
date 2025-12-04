import { Button } from '@/components/ui'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import ProjectSearch from '@/views/projects/components/ProjectSearch'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function ProjectTableTools() {
  const { clearFilter, openDialog } = useProjectStore()
  const { user } = useAuthStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <ProjectSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      {isAdminOrManager(user?.roles) && (
        <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
          Thêm mới
        </Button>
      )}
    </div>
  )
}
