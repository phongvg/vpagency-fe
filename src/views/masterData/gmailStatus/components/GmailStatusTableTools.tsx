import { Button } from '@/components/ui'
import GmailStatusSearch from '@/views/masterData/gmailStatus/components/GmailStatusSearch'
import { useGmailStatusStore } from '@/views/masterData/gmailStatus/store/useGmailStatusStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function GmailStatusTableTools() {
  const { clearFilter, openDialog } = useGmailStatusStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <GmailStatusSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
        Thêm mới
      </Button>
    </div>
  )
}
