import { AdaptableCard } from '@/components/shared'
import CampaignPreviewDialog from '@/views/campaign/components/CampaignPreviewDialog'
import CampaignTableTools from '@/views/campaign/components/CampaignTableTools'

export default function Campaign() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <CampaignTableTools />
      <CampaignPreviewDialog />
    </AdaptableCard>
  )
}
