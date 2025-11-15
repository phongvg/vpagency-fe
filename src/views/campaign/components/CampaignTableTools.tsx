import { Button, Progress } from '@/components/ui'
import { toastError, toastSuccess } from '@/utils/toast'
import CampaignSearch from '@/views/campaign/components/CampaignSearch'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { useExcelWorker } from '@/views/campaign/hooks/useExcelWorker'
import { useRef, ChangeEvent } from 'react'
import { HiOutlineDownload, HiOutlineRefresh } from 'react-icons/hi'

export default function CampaignTableTools() {
  const { openDialog, setCampaigns } = useCampaignStore()
  const { processFile, isProcessing, progress } = useExcelWorker()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const data = await processFile(file)

      setCampaigns(data)
      openDialog()
      toastSuccess(`Đã nhập ${data.length} chiến dịch thành công`)
    } catch (err) {
      toastError((err as Error).message ?? 'Lỗi nhập dữ liệu')
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CampaignSearch />
          <Button size="sm" icon={<HiOutlineRefresh />} />
        </div>
        <Button
          loading={isProcessing}
          size="sm"
          variant="solid"
          icon={<HiOutlineDownload />}
          onClick={handleImportClick}
        >
          Nhập dữ liệu
        </Button>
      </div>

      {isProcessing && (
        <div className="flex items-center gap-3">
          <Progress showInfo percent={progress} width="w-full" />
          <span className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">{progress}%</span>
        </div>
      )}

      <input ref={inputRef} hidden type="file" multiple={false} accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  )
}
