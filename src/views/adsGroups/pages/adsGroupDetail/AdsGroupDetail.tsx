import { DoubleSidedImage, Loading } from '@/components/shared'
import AdsGroupInformation from '@/views/adsGroups/pages/adsGroupDetail/components/AdsGroupInformation'
import { useGetAdsGroupQuery } from '@/views/adsGroups/pages/adsGroupDetail/hooks/useAdsGroupQueries'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

export default function AdsGroupDetail() {
  const { id } = useParams()

  const { data, isLoading } = useGetAdsGroupQuery(id)

  return (
    <Loading loading={isLoading}>
      {!isEmpty(data) && <AdsGroupInformation data={data} />}
      {!isLoading && isEmpty(data) && (
        <div className="flex flex-col justify-center items-center h-full">
          <DoubleSidedImage src="/img/others/img-2.png" darkModeSrc="/img/others/img-2-dark.png" alt="" />
        </div>
      )}
    </Loading>
  )
}
