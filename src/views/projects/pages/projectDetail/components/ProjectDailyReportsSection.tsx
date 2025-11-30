import { Card } from '@/components/ui'
import ProjectDailyReportTableTools from '@/views/projects/pages/projectDetail/components/ProjectDailyReportTableTools'
import ProjectDailyReportTable from '@/views/projects/pages/projectDetail/components/ProjectDailyReportTable'

type ProjectDailyReportsSectionProps = {
  projectId: string
}

export default function ProjectDailyReportsSection({ projectId }: ProjectDailyReportsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-lg">Báo cáo</h4>
      </div>

      <Card>
        <ProjectDailyReportTableTools />
        <ProjectDailyReportTable projectId={projectId} />
      </Card>
    </div>
  )
}
