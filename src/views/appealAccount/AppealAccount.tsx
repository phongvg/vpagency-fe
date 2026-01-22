import { AdaptableCard } from '@/components/shared'
import AppealAccountEditDialog from '@/views/appealAccount/components/AppealAccountEditDialog'
import AppealAccountPreviewDialog from '@/views/appealAccount/components/AppealAccountPreviewDialog'
import AppealAccountTable from '@/views/appealAccount/components/AppealAccountTable'
import AppealAccountTableTools from '@/views/appealAccount/components/AppealAccountTableTools'

export default function AppealAccount() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <AppealAccountTableTools />
      <AppealAccountTable />
      <AppealAccountEditDialog />
      <AppealAccountPreviewDialog />
    </AdaptableCard>
  )
}
