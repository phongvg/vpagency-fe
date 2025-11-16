import FinalUrlTable from './components/FinalUrlTable'
import FinalUrlTableTools from './components/FinalUrlTableTools'
import FinalUrlEditDialog from './components/FinalUrlEditDialog'
import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'

export default function FinalUrl() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <FinalUrlTableTools />
      <Card>
        <FinalUrlTable />
        <FinalUrlEditDialog />
      </Card>
    </AdaptableCard>
  )
}
