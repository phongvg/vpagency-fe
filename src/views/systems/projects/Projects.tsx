import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import ProjectTable from '@/views/systems/projects/components/ProjectTable'
import ProjectTableTools from '@/views/systems/projects/components/ProjectTableTools'

export default function Projects() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <ProjectTableTools />
      <Card>
        <ProjectTable />
      </Card>
    </AdaptableCard>
  )
}
