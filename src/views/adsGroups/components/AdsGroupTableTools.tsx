import { Button } from '@/components/ui'
import AdsGroupSearch from '@/views/adsGroups/components/AdsGroupSearch'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function AdsGroupTableTools() {
  const { clearFilter, setDialogOpen, setSelectedAdsGroup } = useAdsGroupStore()

  const handleAddNew = () => {
    setSelectedAdsGroup(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <AdsGroupSearch />
        <Button size="sm" onClick={clearFilter}>
          <HiOutlineRefresh />
        </Button>
      </div>
      <Button size="sm" variant="solid" className="flex items-center" onClick={handleAddNew}>
        <HiOutlinePlus />
        <span className="ml-2">Thêm mới</span>
      </Button>
    </div>
  )
}
