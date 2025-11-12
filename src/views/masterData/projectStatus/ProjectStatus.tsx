import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import ProjectStatusTable from '@/views/masterData/projectStatus/components/ProjectStatusTable'
import ProjectStatusTableTools from '@/views/masterData/projectStatus/components/ProjectStatusTableTools'

export default function ProjectStatus() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <ProjectStatusTableTools />
      <Card>
        <ProjectStatusTable />
      </Card>
    </AdaptableCard>
  )
}
