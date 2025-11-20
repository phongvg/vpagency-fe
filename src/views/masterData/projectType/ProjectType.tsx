import { AdaptableCard } from '@/components/shared'
import ProjectTypeTable from '@/views/masterData/projectType/components/ProjectTypeTable'
import ProjectTypeTableTools from '@/views/masterData/projectType/components/ProjectTypeTableTools'

export default function ProjectType() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <ProjectTypeTableTools />
      <ProjectTypeTable />
    </AdaptableCard>
  )
}
