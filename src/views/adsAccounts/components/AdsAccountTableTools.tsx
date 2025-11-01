import { Button } from '@/components/ui'
import AdsAccountSearch from '@/views/adsAccounts/components/AdsAccountSearch'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function AdsAccountTableTools() {
  const { clearFilter, setDialogOpen, setSelectedAdsAccount } = useAdsAccountStore()

  const handleAddNew = () => {
    setSelectedAdsAccount(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <AdsAccountSearch />
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
