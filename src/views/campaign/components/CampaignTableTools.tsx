import { Button, Progress } from '@/components/ui'
import { toastError, toastSuccess } from '@/utils/toast'
import CampaignSearch from '@/views/campaign/components/CampaignSearch'
import CampaignFilter, { CampaignFilterPanel } from '@/views/campaign/components/CampaignFilter'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { useExcelWorker } from '@/views/campaign/hooks/useExcelWorker'
import { useRef, ChangeEvent } from 'react'
import { HiOutlineDownload, HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

export default function CampaignTableTools() {
  const { openDialog, openPreviewDialog, setCampaigns, clearFilter } = useCampaignStore()
  const { processFile, isProcessing, progress } = useExcelWorker()
  const { showFilters, filterButton } = CampaignFilter()

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
      openPreviewDialog()
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
          {filterButton}
          <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
        </div>
        <div className="flex gap-2">
          <Button loading={isProcessing} size="sm" icon={<HiOutlineDownload />} onClick={handleImportClick}>
            Nhập dữ liệu
          </Button>
          <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
            Thêm mới
          </Button>
        </div>
      </div>

      {showFilters && <CampaignFilterPanel />}

      {isProcessing && (
        <div className="flex items-center gap-3">
          <Progress showInfo percent={progress} width="w-full" />
        </div>
      )}

      <input ref={inputRef} hidden type="file" multiple={false} accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  )
}
