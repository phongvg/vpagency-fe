import { Dialog } from '@/components/ui'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useProjectStore } from '../store/useProjectStore'
import FinalUrlForm from './FinalUrlForm'

export default function FinalUrlEditDialog() {
  const { dialogOpen, closeDialog, finalUrlId } = useFinalUrlStore()
  const { projectId } = useProjectStore()
  const isEdit = !!finalUrlId

  return (
    <Dialog isOpen={dialogOpen} width={900} onClose={closeDialog}>
      <h5 className="mb-4">{isEdit ? 'Chỉnh sửa URL' : 'Tạo URL mới'}</h5>
      <FinalUrlForm
        projectId={projectId || ''}
        finalUrlId={finalUrlId || undefined}
        isEdit={isEdit}
        onClose={closeDialog}
      />
    </Dialog>
  )
}
