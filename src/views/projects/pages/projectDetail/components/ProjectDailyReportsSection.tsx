import { Card } from '@/components/ui'
import ProjectDailyReportStatistics from '@/views/projects/pages/projectDetail/components/ProjectDailyReportStatistics'
import ProjectDailyReportTableTools from '@/views/projects/pages/projectDetail/components/ProjectDailyReportTableTools'
import ProjectDailyReportTable from '@/views/projects/pages/projectDetail/components/ProjectDailyReportTable'
import ProjectDailyReportFormDialog from '@/views/projects/pages/projectDetail/components/ProjectDailyReportFormDialog'
import { useGetProjectDailyReportsQuery } from '@/views/projects/pages/projectDetail/hooks/useProjectDailyReportQueries'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import { useEffect } from 'react'

type ProjectDailyReportsSectionProps = {
  projectId: string
}

export default function ProjectDailyReportsSection({ projectId }: ProjectDailyReportsSectionProps) {
  const { filter, setFilter } = useProjectDailyReportStore()

  useEffect(() => {
    setFilter({ ...filter, projectId })
  }, [projectId])

  const { data: getReportsResponse } = useGetProjectDailyReportsQuery({
    ...filter,
    projectId,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-lg">Báo cáo hàng ngày</h4>
      </div>

      <ProjectDailyReportStatistics reports={getReportsResponse?.items ?? []} />

      <Card>
        <ProjectDailyReportTableTools />
        <ProjectDailyReportTable projectId={projectId} />
      </Card>

      <ProjectDailyReportFormDialog projectId={projectId} />
    </div>
  )
}
