import { useState, useEffect } from 'react'
import { Button, DatePicker, Dialog, FormItem, Input, Card } from '@/components/ui'
import { HiOutlineX } from 'react-icons/hi'

interface FinanceReportFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: any) => void
}

export default function FinanceReportFormModal({ isOpen, onClose, onSubmit }: FinanceReportFormModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    totalSpend: '',
    totalClicks: '',
    avgCPC: '',
    bid: '',
    country: '',
    countryCPC: '',
    countrySpend: '',
    refs: '',
    costPerRef: '',
    refClickRate: '',
    ftd: '',
    costPerFTD: '',
    ftdRefRate: '',
    volumePerDay: '',
    estimatedRefsPerDay: '',
    clickVolumePercent: '',
    refVolumePercent: '',
  })

  // Auto fill mock data when date is selected
  useEffect(() => {
    if (selectedDate) {
      const mockData = {
        totalSpend: '18500000',
        totalClicks: '9800',
        avgCPC: '1888',
        bid: '2100',
        country: 'Vietnam',
        countryCPC: '1850',
        countrySpend: '15200000',
        refs: '392',
        costPerRef: '47194',
        refClickRate: '4.0',
        ftd: '29',
        costPerFTD: '637931',
        ftdRefRate: '7.40',
        volumePerDay: '12000',
        estimatedRefsPerDay: '480',
        clickVolumePercent: '81.67',
        refVolumePercent: '81.67',
      }
      setFormData(mockData)
    }
  }, [selectedDate])

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }

    // Auto calculate fields
    const totalSpend = parseFloat(newFormData.totalSpend) || 0
    const totalClicks = parseFloat(newFormData.totalClicks) || 0
    const refs = parseFloat(newFormData.refs) || 0
    const ftd = parseFloat(newFormData.ftd) || 0
    const volumePerDay = parseFloat(newFormData.volumePerDay) || 0
    const estimatedRefsPerDay = parseFloat(newFormData.estimatedRefsPerDay) || 0

    // Chi phí mỗi REF = Tổng chi tiêu / Số ref
    if (totalSpend && refs) {
      newFormData.costPerRef = Math.round(totalSpend / refs).toString()
    }

    // Tỷ lệ Ref/click = (Số ref / Tổng click) * 100
    if (refs && totalClicks) {
      newFormData.refClickRate = ((refs / totalClicks) * 100).toFixed(2)
    }

    // Chi phí mỗi FTD = Tổng chi tiêu / Số FTD
    if (totalSpend && ftd) {
      newFormData.costPerFTD = Math.round(totalSpend / ftd).toString()
    }

    // Tỷ lệ FTD/ref = (Số FTD / Số ref) * 100
    if (ftd && refs) {
      newFormData.ftdRefRate = ((ftd / refs) * 100).toFixed(2)
    }

    // % click đạt được so với volume
    if (totalClicks && volumePerDay) {
      newFormData.clickVolumePercent = ((totalClicks / volumePerDay) * 100).toFixed(2)
    }

    // % Ref đạt được so với volume
    if (refs && estimatedRefsPerDay) {
      newFormData.refVolumePercent = ((refs / estimatedRefsPerDay) * 100).toFixed(2)
    }

    setFormData(newFormData)
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        date: selectedDate,
        ...formData,
      })
    }
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} closable={false} width={1200} onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-semibold text-lg">Nhập chỉ số báo cáo</h5>
        <Button
          className="text-gray-600 hover:text-gray-800"
          variant="plain"
          size="sm"
          icon={<HiOutlineX />}
          onClick={onClose}
        />
      </div>

      <div className="mb-6">
        <FormItem label="Chọn ngày báo cáo">
          <DatePicker
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </FormItem>
      </div>

      {selectedDate && (
        <div className="space-y-6 pr-2 max-h-[500px] overflow-y-auto">
          {/* Dữ liệu từ hệ thống/Excel */}
          <Card className="p-2">
            <h6 className="mb-4 font-semibold text-gray-700">Dữ liệu từ hệ thống (Tự động)</h6>
            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Tổng chi tiêu">
                <Input
                  disabled
                  type="number"
                  value={formData.totalSpend}
                  placeholder="Từ hệ thống"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Tổng lượt click">
                <Input
                  disabled
                  type="number"
                  value={formData.totalClicks}
                  placeholder="Từ hệ thống"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="CPC trung bình">
                <Input
                  disabled
                  type="number"
                  value={formData.avgCPC}
                  placeholder="Từ hệ thống"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Thầu">
                <Input
                  disabled
                  type="number"
                  value={formData.bid}
                  placeholder="Từ dữ liệu excel"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Quốc gia đang cắn">
                <Input disabled value={formData.country} placeholder="Từ dữ liệu excel" className="bg-gray-50" />
              </FormItem>

              <FormItem label="CPC quốc gia">
                <Input
                  disabled
                  type="number"
                  value={formData.countryCPC}
                  placeholder="Từ dữ liệu excel"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Chi tiêu quốc gia">
                <Input
                  disabled
                  type="number"
                  value={formData.countrySpend}
                  placeholder="Từ dữ liệu excel"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Volume key/ngày">
                <Input
                  disabled
                  type="number"
                  value={formData.volumePerDay}
                  placeholder="Từ dự án"
                  className="bg-gray-50"
                />
              </FormItem>

              <FormItem label="Dự tính Ref/ngày">
                <Input
                  disabled
                  type="number"
                  value={formData.estimatedRefsPerDay}
                  placeholder="Từ dự án"
                  className="bg-gray-50"
                />
              </FormItem>
            </div>
          </Card>

          {/* Kế toán nhập tay */}
          <Card className="p-2 border-2 border-blue-200">
            <h6 className="mb-4 font-semibold text-blue-700">Kế toán nhập</h6>
            <div className="gap-4 grid grid-cols-2">
              <FormItem asterisk label="Số REF">
                <Input
                  type="number"
                  value={formData.refs}
                  placeholder="Nhập số REF"
                  onChange={(e) => handleInputChange('refs', e.target.value)}
                />
              </FormItem>

              <FormItem asterisk label="Số FTD">
                <Input
                  type="number"
                  value={formData.ftd}
                  placeholder="Nhập số FTD"
                  onChange={(e) => handleInputChange('ftd', e.target.value)}
                />
              </FormItem>
            </div>
          </Card>

          {/* Dữ liệu tự động tính */}
          <Card className="bg-gray-50 p-2">
            <h6 className="mb-4 font-semibold text-gray-700">Kết quả tính toán (Tự động)</h6>
            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Chi phí mỗi REF">
                <Input
                  disabled
                  type="number"
                  value={formData.costPerRef}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>

              <FormItem label="Tỉ lệ Ref/Click (%)">
                <Input
                  disabled
                  type="number"
                  value={formData.refClickRate}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>

              <FormItem label="Chi phí mỗi FTD">
                <Input
                  disabled
                  type="number"
                  value={formData.costPerFTD}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>

              <FormItem label="Tỉ lệ FTD/Ref (%)">
                <Input
                  disabled
                  type="number"
                  value={formData.ftdRefRate}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>

              <FormItem label="% click đạt được so với volume">
                <Input
                  disabled
                  type="number"
                  value={formData.clickVolumePercent}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>

              <FormItem label="% Ref đạt được so với volume">
                <Input
                  disabled
                  type="number"
                  value={formData.refVolumePercent}
                  placeholder="Tự động tính"
                  className="bg-white"
                />
              </FormItem>
            </div>
          </Card>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="plain" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="solid" disabled={!selectedDate} onClick={handleSubmit}>
          Lưu báo cáo
        </Button>
      </div>
    </Dialog>
  )
}
