import { Button, Progress } from '@/components/ui'
import { toastError, toastSuccess } from '@/utils/toast'
import CampaignFilter, { CampaignFilterPanel } from '@/views/campaign/components/CampaignFilter'
import CurrencyRateDialog from '@/views/campaign/components/CurrencyRateDialog'
import DateSelectDialog from '@/views/campaign/components/DateSelectDialog'
import { useEmailExcelWorker } from '@/views/campaign/hooks/useEmailExcelWorker'
import { useExcelWorker } from '@/views/campaign/hooks/useExcelWorker'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { CurrencyRate, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { applyExchangeRate } from '@/views/campaign/utils/applyExchangeRate'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { HiOutlineDownload, HiOutlinePlus, HiOutlineRefresh } from 'react-icons/hi'

interface ImportData {
  data: UpdateCampaignRequest[]
  currencyRates: CurrencyRate[]
}

export default function CampaignTableTools() {
  const [isOpenCurrencyRateDialog, setIsOpenCurrencyRateDialog] = useState(false)
  const [isOpenDateSelectDialog, setIsOpenDateSelectDialog] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [importData, setImportData] = useState<ImportData>({
    data: [],
    currencyRates: [],
  })

  const { openDialog, openPreviewDialog, openEmailPreviewDialog, setCampaigns, setEmailAssignments, clearFilter } =
    useCampaignStore()
  const { showFilters, filterButton } = CampaignFilter()
  const { getAvailableDates, processFile, isProcessing, progress } = useExcelWorker()
  const {
    processFile: processEmailFile,
    isProcessing: isEmailProcessing,
    progress: emailProgress,
  } = useEmailExcelWorker()

  const inputCampaignRef = useRef<HTMLInputElement | null>(null)
  const inputEmailRef = useRef<HTMLInputElement | null>(null)

  const isInvalidForm = useMemo(
    () =>
      importData.currencyRates.some((currencyRate) => currencyRate.rateToUSD === null || currencyRate.rateToUSD <= 0),
    [importData.currencyRates],
  )

  const handleImportClick = () => {
    inputCampaignRef.current?.click()
  }

  const handleEmailClick = () => {
    inputEmailRef.current?.click()
  }

  const handleCampaignFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const dates = await getAvailableDates(file)

      if (dates.length === 0) {
        toastError('Không tìm thấy dữ liệu ngày trong file')
        return
      }

      setPendingFile(file)
      setAvailableDates(dates)
      setSelectedDate(dates[0])
      setIsOpenDateSelectDialog(true)
    } catch (err) {
      toastError((err as Error).message ?? 'Lỗi đọc file')
    } finally {
      e.target.value = ''
    }
  }

  const handleDateSelect = async () => {
    if (!pendingFile || !selectedDate) return

    setIsOpenDateSelectDialog(false)

    try {
      const { data, currencyRates } = await processFile(pendingFile, selectedDate)

      setImportData({ data, currencyRates })

      if (currencyRates.length > 0) {
        setIsOpenCurrencyRateDialog(true)
      } else {
        setCampaigns(data)
        openPreviewDialog()
        toastSuccess(`Đã nhập ${data.length} chiến dịch thành công`)
      }
    } catch (err) {
      toastError((err as Error).message ?? 'Lỗi nhập dữ liệu')
    } finally {
      setPendingFile(null)
      setSelectedDate(null)
      setAvailableDates([])
    }
  }

  const closeDateSelectDialog = () => {
    setIsOpenDateSelectDialog(false)
    setPendingFile(null)
    setSelectedDate(null)
    setAvailableDates([])
  }

  const handleEmailFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { data } = await processEmailFile(file)

      setEmailAssignments(data)
      toastSuccess(`Đã nhập ${data.length} email thành công`)
      openEmailPreviewDialog()
    } catch (err) {
      toastError((err as Error).message ?? 'Lỗi nhập dữ liệu')
    } finally {
      e.target.value = ''
    }
  }

  const closeCurrencyRateDialog = () => {
    setImportData({ data: [], currencyRates: [] })
    setIsOpenCurrencyRateDialog(false)
  }

  const handleCurrencyRateChange = (rate: number, code: string) => {
    const currencyRates = importData.currencyRates.map((currencyRate) => {
      if (currencyRate.code === code) {
        currencyRate.rateToUSD = rate
      }
      return currencyRate
    })
    setImportData({ ...importData, currencyRates })
  }

  const handleCurrencyRateSubmit = () => {
    const defaultRate = 1

    const record: Record<string, number> = importData.currencyRates.reduce(
      (acc, item) => {
        const rate = item.rateToUSD ?? defaultRate
        acc[item.uid] = rate
        return acc
      },
      {} as Record<string, number>,
    )

    const data = applyExchangeRate(importData.data, record)

    setCampaigns(data)
    openPreviewDialog()
    toastSuccess(`Đã nhập ${data.length} chiến dịch thành công`)
    closeCurrencyRateDialog()
  }

  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {filterButton}
            <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
          </div>
          <div className="flex gap-2">
            <Button loading={isProcessing} size="sm" icon={<HiOutlineDownload />} onClick={handleImportClick}>
              Nhập dữ liệu
            </Button>
            <Button size="sm" icon={<HiOutlineDownload />} onClick={handleEmailClick}>
              Nhập Email
            </Button>
            <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
              Thêm mới
            </Button>
          </div>
        </div>

        {showFilters && <CampaignFilterPanel />}

        {(isProcessing || isEmailProcessing) && (
          <div className="flex items-center gap-3">
            <Progress showInfo percent={isProcessing ? progress : emailProgress} width="w-full" />
          </div>
        )}

        <input
          ref={inputCampaignRef}
          hidden
          type="file"
          multiple={false}
          accept=".xlsx, .xls"
          onChange={handleCampaignFileChange}
        />

        <input
          ref={inputEmailRef}
          hidden
          type="file"
          multiple={false}
          accept=".xlsx, .xls"
          onChange={handleEmailFileChange}
        />
      </div>

      <CurrencyRateDialog
        isOpen={isOpenCurrencyRateDialog}
        campaigns={importData.data}
        currencyRates={importData.currencyRates}
        isInvalidForm={isInvalidForm}
        onChangeCurrencyRate={handleCurrencyRateChange}
        onSubmit={handleCurrencyRateSubmit}
        onClose={closeCurrencyRateDialog}
      />

      <DateSelectDialog
        isOpen={isOpenDateSelectDialog}
        availableDates={availableDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onSubmit={handleDateSelect}
        onClose={closeDateSelectDialog}
      />
    </>
  )
}
