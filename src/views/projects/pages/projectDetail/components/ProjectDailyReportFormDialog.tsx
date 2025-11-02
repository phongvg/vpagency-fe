import { Dialog } from '@/components/ui'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import ProjectDailyReportForm from '@/views/projects/pages/projectDetail/components/ProjectDailyReportForm'

type ProjectDailyReportFormDialogProps = {
  projectId: string
}

export default function ProjectDailyReportFormDialog({ projectId }: ProjectDailyReportFormDialogProps) {
  const { dialogOpen, setDialogOpen, selectedReport, setSelectedReport } = useProjectDailyReportStore()

  const onDialogClose = () => {
    setDialogOpen(false)
    setSelectedReport(null)
  }

  return (
    <Dialog isOpen={dialogOpen} width={800} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedReport ? 'Cập nhật báo cáo hàng ngày' : 'Thêm báo cáo hàng ngày'}</h5>
      <ProjectDailyReportForm projectId={projectId} onClose={onDialogClose} />
    </Dialog>
  )
}
