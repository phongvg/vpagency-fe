import { Dialog } from '@/components/ui'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import FinalUrlForm from './FinalUrlForm'

export default function FinalUrlEditDialog() {
  const { dialogOpen, closeDialog, finalUrlId } = useFinalUrlStore()
  const isEdit = !!finalUrlId

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog}>
      <h5 className="mb-4">{isEdit ? 'Chỉnh sửa URL' : 'Tạo URL mới'}</h5>
      <FinalUrlForm />
    </Dialog>
  )
}
