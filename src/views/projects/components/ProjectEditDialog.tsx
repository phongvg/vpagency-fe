import { Dialog } from '@/components/ui'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import ProjectForm from '@/views/projects/components/ProjectForm'

export default function ProjectEditDialog() {
  const { dialogOpen, selectedProject, closeDialog } = useProjectStore()

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">{selectedProject ? 'Cập nhật dự án' : 'Thêm dự án mới'}</h5>
      <ProjectForm />
    </Dialog>
  )
}
