import { Dialog } from '@/components/ui'
import ProjectTypeForm from '@/views/masterData/projectType/components/ProjectTypeForm'
import { useProjectTypeStore } from '@/views/masterData/projectType/store/useProjectTypeStore'

export default function ProjectTypeEditDialog() {
  const { dialogOpen, setDialogOpen, selectedProjectType } = useProjectTypeStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedProjectType ? 'Cập nhật loại dự án' : 'Thêm loại dự án'}</h5>
      <ProjectTypeForm onClose={onDialogClose} />
    </Dialog>
  )
}
