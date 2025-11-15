import { Button } from '@/components/ui'
import { toastError } from '@/utils/toast'
import CampaignSearch from '@/views/campaign/components/CampaignSearch'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { convertExcelData } from '@/views/campaign/utils/import'
import { useRef, ChangeEvent, useState } from 'react'
import { HiOutlineDownload, HiOutlineRefresh } from 'react-icons/hi'

export default function CampaignTableTools() {
  const { openDialog, setCampaigns } = useCampaignStore()

  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    try {
      const data = await convertExcelData(file)

      setCampaigns(data)
      openDialog()
    } catch (err) {
      toastError((err as string) ?? 'Lỗi nhập dữ liệu')
    } finally {
      e.target.value = ''
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <CampaignSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} />
      </div>
      <Button loading={isLoading} size="sm" variant="solid" icon={<HiOutlineDownload />} onClick={handleImportClick}>
        Nhập dữ liệu
      </Button>

      <input ref={inputRef} hidden type="file" multiple={false} accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  )
}
