import { Dialog } from '@/components/ui'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import AdsGroupForm from '@/views/adsGroups/components/AdsGroupForm'

export default function AdsGroupEditDialog() {
  const { dialogOpen, setDialogOpen, selectedAdsGroup } = useAdsGroupStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedAdsGroup ? 'Cập nhật nhóm quảng cáo' : 'Thêm nhóm quảng cáo'}</h5>
      <AdsGroupForm onClose={onDialogClose} />
    </Dialog>
  )
}
