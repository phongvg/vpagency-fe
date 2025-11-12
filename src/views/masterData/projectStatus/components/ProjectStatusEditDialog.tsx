import { Dialog } from '@/components/ui'
import ProjectStatusForm from '@/views/masterData/projectStatus/components/ProjectStatusForm'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'

export default function ProjectStatusEditDialog() {
  const { dialogOpen, setDialogOpen, selectedProjectStatus } = useProjectStatusStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedProjectStatus ? 'Cập nhật trạng thái dự án' : 'Thêm trạng thái dự án'}</h5>
      <ProjectStatusForm onClose={onDialogClose} />
    </Dialog>
  )
}
