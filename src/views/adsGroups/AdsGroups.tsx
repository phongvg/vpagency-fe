import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import AdsGroupTable from '@/views/adsGroups/components/AdsGroupTable'
import AdsGroupTableTools from '@/views/adsGroups/components/AdsGroupTableTools'

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
