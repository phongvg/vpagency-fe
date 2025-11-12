import { Button } from '@/components/ui'
import ProjectTypeSearch from '@/views/masterData/projectType/components/ProjectTypeSearch'
import { useProjectTypeStore } from '@/views/masterData/projectType/store/useProjectTypeStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function ProjectTypeTableTools() {
  const { clearFilter, setDialogOpen, setSelectedProjectType } = useProjectTypeStore()

  const handleAddNew = () => {
    setSelectedProjectType(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <ProjectTypeSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
        Thêm mới
      </Button>
    </div>
  )
}
