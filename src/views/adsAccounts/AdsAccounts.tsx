import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import AdsAccountTable from '@/views/adsAccounts/components/AdsAccountTable'
import AdsAccountTableTools from '@/views/adsAccounts/components/AdsAccountTableTools'

export default function AdsAccounts() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <AdsAccountTableTools />
      <Card>
        <AdsAccountTable />
      </Card>
    </AdaptableCard>
  )
}
