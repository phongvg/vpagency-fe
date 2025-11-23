import { AdaptableCard } from '@/components/shared'
import GmailStatusEditDialog from '@/views/masterData/gmailStatus/components/GmailStatusEditDialog'
import GmailStatusTable from '@/views/masterData/gmailStatus/components/GmailStatusTable'
import GmailStatusTableTools from '@/views/masterData/gmailStatus/components/GmailStatusTableTools'

export default function GmailStatus() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <GmailStatusTableTools />
      <GmailStatusTable />
      <GmailStatusEditDialog />
    </AdaptableCard>
  )
}
