import { Button } from '@/components/ui'
import GmailAccountSearch from '@/views/gmailAccounts/components/GmailAccountSearch'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function GmailAccountTableTools() {
  const { clearFilter, openDialog } = useGmailAccountStore()

  const handleAddNew = () => {
    openDialog()
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <GmailAccountSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
        Thêm mới
      </Button>
    </div>
  )
}
