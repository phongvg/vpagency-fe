import { DoubleSidedImage, Loading } from '@/components/shared'
import AdsAccountInformation from '@/views/adsAccounts/pages/adsAccountDetail/components/AdsAccountInformation'
import { useGetAdsAccountQuery } from '@/views/adsAccounts/pages/adsAccountDetail/hooks/useAdsAccountQueries'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

export default function AdsAccountDetail() {
  const { id } = useParams()

  const { data, isLoading } = useGetAdsAccountQuery(id)

  return (
    <Loading loading={isLoading}>
      {!isEmpty(data) && <AdsAccountInformation data={data} />}
      {!isLoading && isEmpty(data) && (
        <div className="flex flex-col justify-center items-center h-full">
          <DoubleSidedImage src="/img/others/img-2.png" darkModeSrc="/img/others/img-2-dark.png" alt="" />
        </div>
      )}
    </Loading>
  )
}
