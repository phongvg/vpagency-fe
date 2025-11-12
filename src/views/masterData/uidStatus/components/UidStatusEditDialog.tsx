import { Dialog } from '@/components/ui'
import UidStatusForm from '@/views/masterData/uidStatus/components/UidStatusForm'
import { useUidStatusStore } from '@/views/masterData/uidStatus/store/useUidStatusStore'

export default function UidStatusEditDialog() {
  const { dialogOpen, setDialogOpen, selectedUidStatus } = useUidStatusStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedUidStatus ? 'Cập nhật trạng thái UID' : 'Thêm trạng thái UID'}</h5>
      <UidStatusForm onClose={onDialogClose} />
    </Dialog>
  )
}
