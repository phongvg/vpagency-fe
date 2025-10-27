import { Dialog } from '@/components/ui'
import { useProjectStore } from '@/views/systems/projects/store/useProjectStore'
import ProjectForm from '@/views/systems/projects/components/ProjectForm'

export default function ProjectEditDialog() {
  const { dialogOpen, setDialogOpen, setSelectedProject, selectedProject } = useProjectStore()

  const onDialogClose = () => {
    setDialogOpen(false)
    setSelectedProject(null)
  }

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedProject ? 'Cập nhật dự án' : 'Thêm dự án mới'}</h5>
      <ProjectForm onClose={onDialogClose} />
    </Dialog>
  )
}
