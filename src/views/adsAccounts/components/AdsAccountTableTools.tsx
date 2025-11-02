import { Button } from '@/components/ui'
import AdsAccountSearch from '@/views/adsAccounts/components/AdsAccountSearch'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import { HiOutlineDownload, HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

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
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" icon={<HiOutlineDownload />}>
          Nhập dữ liệu
        </Button>

        <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
          Thêm mới
        </Button>
      </div>
    </div>
  )
}
