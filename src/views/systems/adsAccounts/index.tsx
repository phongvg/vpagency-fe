import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import AdsAccountTable from '@/views/systems/adsAccounts/components/AdsAccountTable'
import AdsAccountTableTools from '@/views/systems/adsAccounts/components/AdsAccountTableTools'

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
