import { AdaptableCard } from '@/components/shared'
import GmailAccountTable from '@/views/gmailAccounts/components/GmailAccountTable'
import GmailAccountTableTools from '@/views/gmailAccounts/components/GmailAccountTableTools'

export default function GmailAccounts() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <GmailAccountTableTools />
      <GmailAccountTable />
    </AdaptableCard>
  )
}
