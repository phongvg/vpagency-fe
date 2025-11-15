import { Campaign } from '@/@types/campaign'
import { DataTable } from '@/components/shared'
import { Dialog } from '@/components/ui'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export default function CampaignPreviewDialog() {
  const { campaigns, dialogOpen, closeDialog } = useCampaignStore()

  const columns: ColumnDef<Campaign>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
    ],
    [],
  )

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">Xem trước</h5>
      <DataTable
        columns={columns}
        data={campaigns}
        skeletonAvatarColumns={[4]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
      />
    </Dialog>
  )
}
