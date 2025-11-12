import { Button } from '@/components/ui'
import ProjectStatusSearch from '@/views/masterData/projectStatus/components/ProjectStatusSearch'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function ProjectStatusTableTools() {
  const { clearFilter, setDialogOpen, setSelectedProjectStatus } = useProjectStatusStore()

  const handleAddNew = () => {
    setSelectedProjectStatus(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <ProjectStatusSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
        Thêm mới
      </Button>
    </div>
  )
}
