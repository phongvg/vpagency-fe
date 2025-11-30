import { DoubleSidedImage, Loading } from '@/components/shared'
import ProjectHistoryChangesDialog from '@/views/projects/pages/projectDetail/components/ProjectHistoryChangesDialog'
import ProjectInformation from '@/views/projects/pages/projectDetail/components/ProjectInformation'
import { useGetProjectQuery } from '@/views/projects/pages/projectDetail/hooks/useProjectDetail'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { id } = useParams()

  const { data, isLoading } = useGetProjectQuery(id)

  return (
    <>
      <Loading loading={isLoading}>
        {!isEmpty(data) && <ProjectInformation data={data} />}

        {!isLoading && isEmpty(data) && (
          <div className="flex flex-col justify-center items-center h-full">
            <DoubleSidedImage src="/img/others/img-2.png" darkModeSrc="/img/others/img-2-dark.png" alt="" />
          </div>
        )}
      </Loading>

      <ProjectHistoryChangesDialog />
    </>
  )
}
