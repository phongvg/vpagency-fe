import { AdaptableCard } from '@/components/shared'
import FinanceReportTable from '@/views/finance/reports/components/FinanceReportTable'
import FinanceReportTableTools from '@/views/finance/reports/components/FinanceReportTableTools'

export default function FinanceReport() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <FinanceReportTableTools />
      <FinanceReportTable showSummary />
    </AdaptableCard>
  )
}
