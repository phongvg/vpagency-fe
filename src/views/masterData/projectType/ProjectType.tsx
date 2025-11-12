import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import ProjectTypeTable from '@/views/masterData/projectType/components/ProjectTypeTable'
import ProjectTypeTableTools from '@/views/masterData/projectType/components/ProjectTypeTableTools'

export default function ProjectType() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <ProjectTypeTableTools />
      <Card>
        <ProjectTypeTable />
      </Card>
    </AdaptableCard>
  )
}
