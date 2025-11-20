import FinalUrlTable from './components/FinalUrlTable'
import FinalUrlTableTools from './components/FinalUrlTableTools'
import FinalUrlEditDialog from './components/FinalUrlEditDialog'
import { AdaptableCard } from '@/components/shared'

export default function FinalUrl() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <FinalUrlTableTools />
      <FinalUrlTable />
      <FinalUrlEditDialog />
    </AdaptableCard>
  )
}
