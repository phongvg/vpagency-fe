import { Button, Progress } from '@/components/ui'
import { toastError, toastSuccess } from '@/utils/toast'
import AppealAccountFilter, { AppealAccountFilterPanel } from '@/views/appealAccount/components/AppealAccountFilter'
import { useExcelWorker } from '@/views/appealAccount/hooks/useExcelWorker'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'
import { ChangeEvent, useRef } from 'react'
import { HiOutlineDownload, HiOutlinePlus } from 'react-icons/hi'

export default function AppealAccountTableTools() {
  const { clearFilter, openDialog, openPreviewDialog, setAppealAccounts } = useAppealAccountStore()
  const { processFile, isProcessing, progress } = useExcelWorker()
  const { showFilters, filterButton } = AppealAccountFilter()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    inputRef.current?.click()
  }

  const handleAddNew = () => {
    openDialog()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await processFile(file)
      setAppealAccounts(data)
      openPreviewDialog()
      toastSuccess(`Đã nhập ${data.length} tài khoản Kháng cáo thành công`)
    } catch (err) {
      toastError((err as Error).message ?? 'Lỗi nhập dữ liệu')
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">{filterButton}</div>

        <div className="flex gap-2">
          <Button loading={isProcessing} size="sm" icon={<HiOutlineDownload />} onClick={handleImportClick}>
            Nhập dữ liệu
          </Button>
          <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleAddNew}>
            Thêm mới
          </Button>
        </div>
      </div>

      {showFilters && <AppealAccountFilterPanel />}

      {isProcessing && (
        <div className="flex items-center gap-3">
          <Progress showInfo percent={progress} width="w-full" />
        </div>
      )}

      <input ref={inputRef} hidden type="file" multiple={false} accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  )
}
