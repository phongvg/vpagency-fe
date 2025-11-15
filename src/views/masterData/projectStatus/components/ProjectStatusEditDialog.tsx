import { Dialog } from '@/components/ui'
import ProjectStatusForm from '@/views/masterData/projectStatus/components/ProjectStatusForm'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'

export default function ProjectStatusEditDialog() {
  const { dialogOpen, projectStatusId, closeDialog } = useProjectStatusStore()

  return (
    <Dialog isOpen={dialogOpen} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">{projectStatusId ? 'Cập nhật trạng thái dự án' : 'Thêm trạng thái dự án'}</h5>
      <ProjectStatusForm />
    </Dialog>
  )
}
