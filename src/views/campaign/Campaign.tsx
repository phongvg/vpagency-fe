import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'
import CampaignEditDialog from '@/views/campaign/components/CampaignEditDialog'
import CampaignPreviewDialog from '@/views/campaign/components/CampaignPreviewDialog'
import CampaignTable from '@/views/campaign/components/CampaignTable'
import CampaignTableTools from '@/views/campaign/components/CampaignTableTools'

export default function Campaign() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <CampaignTableTools />
      <Card>
        <CampaignTable />
        <CampaignPreviewDialog />
        <CampaignEditDialog />
      </Card>
    </AdaptableCard>
  )
}
