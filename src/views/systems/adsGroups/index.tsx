import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import AdsGroupTable from '@/views/systems/adsGroups/components/AdsGroupTable'
import AdsGroupTableTools from '@/views/systems/adsGroups/components/AdsGroupTableTools'

export default function AdsGroups() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <AdsGroupTableTools />
      <Card>
        <AdsGroupTable />
      </Card>
    </AdaptableCard>
  )
}
