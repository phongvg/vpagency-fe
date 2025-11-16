import { Button } from '@/components/ui'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import FinalUrlSearch from '@/views/finalUrls/components/FinalUrlSearch'

export default function FinalUrlTableTools() {
  const { openDialog, clearFilter } = useFinalUrlStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <FinalUrlSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
        Thêm mới
      </Button>
    </div>
  )
}
