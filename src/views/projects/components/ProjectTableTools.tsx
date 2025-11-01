import { Button } from '@/components/ui'
import ProjectSearch from '@/views/projects/components/ProjectSearch'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function ProjectTableTools() {
  const { clearFilter, setDialogOpen, setSelectedProject } = useProjectStore()

  const handleCreate = () => {
    setSelectedProject(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <ProjectSearch />
        <Button size="sm" onClick={clearFilter}>
          <HiOutlineRefresh />
        </Button>
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleCreate}>
        Thêm dự án
      </Button>
    </div>
  )
}
