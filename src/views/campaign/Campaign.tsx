import { AdaptableCard } from '@/components/shared'
import CampaignEditDialog from '@/views/campaign/components/CampaignEditDialog'
import CampaignPreviewDialog from '@/views/campaign/components/CampaignPreviewDialog'
import CampaignSummaryDialog from '@/views/campaign/components/CampaignSummaryDialog'
import CampaignTable from '@/views/campaign/components/CampaignTable'
import CampaignTableTools from '@/views/campaign/components/CampaignTableTools'
import EmailAssignmentPreviewDialog from '@/views/campaign/components/EmailAssignmentPreviewDialog'

export default function Campaign() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <CampaignTableTools />
      <CampaignTable />
      <CampaignPreviewDialog />
      <EmailAssignmentPreviewDialog />
      <CampaignEditDialog />
      <CampaignSummaryDialog />
    </AdaptableCard>
  )
}
