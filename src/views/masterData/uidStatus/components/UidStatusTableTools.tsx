import { Button } from '@/components/ui'
import UidStatusSearch from '@/views/masterData/uidStatus/components/UidStatusSearch'
import { useUidStatusStore } from '@/views/masterData/uidStatus/store/useUidStatusStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function UidStatusTableTools() {
  const { clearFilter, setDialogOpen, setSelectedUidStatus } = useUidStatusStore()

  const handleAddNew = () => {
    setSelectedUidStatus(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <UidStatusSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
        Thêm mới
      </Button>
    </div>
  )
}
