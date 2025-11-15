import { AdaptableCard } from '@/components/shared'
import CampaignEditDialog from '@/views/campaign/components/CampaignEditDialog'
import CampaignPreviewDialog from '@/views/campaign/components/CampaignPreviewDialog'
import CampaignTable from '@/views/campaign/components/CampaignTable'
import CampaignTableTools from '@/views/campaign/components/CampaignTableTools'

export default function Campaign() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <CampaignTableTools />
      <CampaignTable />
      <CampaignPreviewDialog />
      <CampaignEditDialog />
    </AdaptableCard>
  )
}
