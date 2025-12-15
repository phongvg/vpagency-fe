import { Button, Card, FormContainer, FormItem, Input } from '@/components/ui'
import { formatUSD } from '@/helpers/formatUSD'
import { UpdateProjectDailyStatRequest } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  totalCost: Yup.number().required('Vui lòng nhập tổng chi tiêu').min(0, 'Tổng chi tiêu phải lớn hơn 0'),
  totalRef: Yup.number().required('Vui lòng nhập số REF').min(0, 'Số REF phải lớn hơn 0'),
  totalFtd: Yup.number().required('Vui lòng nhập số FTD').min(0, 'Số FTD phải lớn hơn 0'),
  receivedRevenue: Yup.number().required('Vui lòng nhập doanh thu đã nhận').min(0, 'Doanh thu phải lớn hơn 0'),
  holdRevenue: Yup.number().required('Vui lòng nhập doanh thu đang giữ').min(0, 'Doanh thu đang giữ phải lớn hơn 0'),
  profit: Yup.number().required('Vui lòng nhập lợi nhuận'),
})

type Props = {
  generatedData: UpdateProjectDailyStatRequest
  onSubmit: (values: ManualInputData) => void
  onCancel: () => void
  onBack?: () => void
}

export type ManualInputData = {
  totalCost: number
  totalRef: number
  totalFtd: number
  receivedRevenue: number
  holdRevenue: number
  profit: number
  roi: number
}

export default function FinanceReportFormStep2({ generatedData, onSubmit, onCancel, onBack }: Props) {
  const initialValues: ManualInputData = {
    totalCost: generatedData.totalCost || 0,
    totalRef: generatedData.totalRef || 0,
    totalFtd: generatedData.totalFtd || 0,
    receivedRevenue: generatedData.receivedRevenue || 0,
    holdRevenue: generatedData.holdRevenue || 0,
    profit: (generatedData.totalCost || 0) - (generatedData.receivedRevenue || 0),
    roi: 0,
  }

  const calculateFields = (values: ManualInputData) => {
    const totalCost = parseFloat(String(values.totalCost)) || 0
    const totalClicks = generatedData.totalClicks || 0
    const totalRef = parseFloat(String(values.totalRef)) || 0
    const totalFtd = parseFloat(String(values.totalFtd)) || 0
    const totalTargetDailyKeyVolume = generatedData.totalTargetDailyKeyVolume || 0
    const totalTargetRef = generatedData.totalTargetRef || 0

    // Chi phí mỗi REF = Tổng chi tiêu / Số ref
    const costPerRef = totalRef > 0 ? totalCost / totalRef : 0

    // Tỷ lệ Ref/click = (Số ref / Tổng click) * 100
    const rateRefPerClick = totalClicks > 0 ? (totalRef / totalClicks) * 100 : 0

    // Chi phí mỗi FTD = Tổng chi tiêu / Số FTD
    const costPerFtd = totalFtd > 0 ? totalCost / totalFtd : 0

    // Tỷ lệ FTD/ref = (Số FTD / Số ref) * 100
    const costFtdPerRef = totalRef > 0 ? (totalFtd / totalRef) * 100 : 0

    // % click đạt được so với volume
    const totalClickPerVolume = totalTargetDailyKeyVolume > 0 ? (totalClicks / totalTargetDailyKeyVolume) * 100 : 0

    // % Ref đạt được so với volume
    const totalRefPerVolume = totalTargetRef > 0 ? (totalRef / totalTargetRef) * 100 : 0

    // Lợi nhuận - lấy từ input của user
    const profit = parseFloat(String(values.profit)) || 0

    // ROI = Lợi nhuận / Chi tiêu * 100
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0

    return {
      costPerRef,
      rateRefPerClick,
      costPerFtd,
      costFtdPerRef,
      totalClickPerVolume,
      totalRefPerVolume,
      profit,
      roi,
    }
  }

  const handleSubmit = (values: ManualInputData) => {
    onSubmit(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue, values }) => {
        const calculated = calculateFields(values)

        return (
          <Form>
            <FormContainer>
              <div className="space-y-6 mt-4">
                <Card className="p-2">
                  <h6 className="mb-4 font-semibold text-gray-700">Dữ liệu từ hệ thống (Tự động)</h6>
                  <div className="gap-4 grid grid-cols-3">
                    <FormItem label="Tổng lượt click">
                      <Input disabled value={generatedData.totalClicks} className="bg-gray-50" />
                    </FormItem>

                    <FormItem label="Thầu">
                      <Input disabled value={formatUSD(generatedData.totalTargetCpc)} className="bg-gray-50" />
                    </FormItem>

                    <FormItem label="Quốc gia đang cắn">
                      <Input
                        disabled
                        value={generatedData.activeCountries?.map((c) => c.location).join(', ')}
                        className="bg-gray-50"
                      />
                    </FormItem>

                    <FormItem label="Mục tiêu Volume key/ngày">
                      <Input disabled value={generatedData.totalTargetDailyKeyVolume} className="bg-gray-50" />
                    </FormItem>

                    <FormItem label="Dự tính Ref/ngày">
                      <Input disabled value={generatedData.totalTargetRef} className="bg-gray-50" />
                    </FormItem>
                  </div>
                </Card>

                <Card className="p-2 border-2">
                  <h6 className="mb-4 font-semibold">Kế toán nhập (Bắt buộc)</h6>
                  <div className="gap-4 grid grid-cols-2">
                    <FormItem
                      asterisk
                      label="Số REF"
                      invalid={!!(errors.totalRef && touched.totalRef)}
                      errorMessage={errors.totalRef as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập số REF..."
                        value={values.totalRef}
                        onChange={(e) => setFieldValue('totalRef', e.target.value)}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Số FTD"
                      invalid={!!(errors.totalFtd && touched.totalFtd)}
                      errorMessage={errors.totalFtd as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập số FTD..."
                        value={values.totalFtd}
                        onChange={(e) => setFieldValue('totalFtd', e.target.value)}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Tổng chi tiêu"
                      invalid={!!(errors.totalCost && touched.totalCost)}
                      errorMessage={errors.totalCost as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập tổng chi tiêu..."
                        value={values.totalCost}
                        onChange={(e) => {
                          setFieldValue('totalCost', e.target.value)
                          const newProfit =
                            (parseFloat(e.target.value) || 0) - (parseFloat(String(values.receivedRevenue)) || 0)
                          setFieldValue('profit', newProfit)
                          // Tự động tính ROI
                          const newRoi =
                            parseFloat(e.target.value) > 0 ? (newProfit / parseFloat(e.target.value)) * 100 : 0
                          setFieldValue('roi', newRoi)
                        }}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Doanh thu đã nhận"
                      invalid={!!(errors.receivedRevenue && touched.receivedRevenue)}
                      errorMessage={errors.receivedRevenue as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập doanh thu đã nhận..."
                        value={values.receivedRevenue}
                        onChange={(e) => {
                          setFieldValue('receivedRevenue', e.target.value)
                          const newProfit =
                            (parseFloat(String(values.totalCost)) || 0) - (parseFloat(e.target.value) || 0)
                          setFieldValue('profit', newProfit)
                          // Tự động tính ROI
                          const totalCost = parseFloat(String(values.totalCost)) || 0
                          const newRoi = totalCost > 0 ? (newProfit / totalCost) * 100 : 0
                          setFieldValue('roi', newRoi)
                        }}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Doanh thu đang giữ"
                      invalid={!!(errors.holdRevenue && touched.holdRevenue)}
                      errorMessage={errors.holdRevenue as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập doanh thu đang giữ..."
                        value={values.holdRevenue}
                        onChange={(e) => setFieldValue('holdRevenue', e.target.value)}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Lợi nhuận"
                      invalid={!!(errors.profit && touched.profit)}
                      errorMessage={errors.profit as string}
                    >
                      <Input
                        type="number"
                        placeholder="Nhập lợi nhuận..."
                        value={values.profit}
                        onChange={(e) => {
                          setFieldValue('profit', e.target.value)
                          // Tự động tính ROI
                          const totalCost = parseFloat(String(values.totalCost)) || 0
                          const newRoi = totalCost > 0 ? (parseFloat(e.target.value) / totalCost) * 100 : 0
                          setFieldValue('roi', newRoi)
                        }}
                      />
                    </FormItem>
                  </div>
                </Card>

                <Card className="p-2">
                  <h6 className="mb-4 font-semibold text-gray-700">Kết quả tính toán (Tự động)</h6>
                  <div className="gap-4 grid grid-cols-3">
                    <FormItem label="Chi phí mỗi REF">
                      <Input disabled value={formatUSD(calculated.costPerRef)} className="bg-white" />
                    </FormItem>

                    <FormItem label="Tỷ lệ Ref/Click (%)">
                      <Input disabled value={calculated.rateRefPerClick.toFixed(2)} className="bg-white" />
                    </FormItem>

                    <FormItem label="Chi phí mỗi FTD">
                      <Input disabled value={formatUSD(calculated.costPerFtd)} className="bg-white" />
                    </FormItem>

                    <FormItem label="Tỷ lệ FTD/Ref (%)">
                      <Input disabled value={calculated.costFtdPerRef.toFixed(2)} className="bg-white" />
                    </FormItem>

                    <FormItem label="% click đạt được">
                      <Input disabled value={calculated.totalClickPerVolume.toFixed(2)} className="bg-white" />
                    </FormItem>

                    <FormItem label="% Ref đạt được">
                      <Input disabled value={calculated.totalRefPerVolume.toFixed(2)} className="bg-white" />
                    </FormItem>

                    <FormItem label="ROI (%)">
                      <Input disabled value={calculated.roi.toFixed(2)} className="bg-white" />
                    </FormItem>
                  </div>
                </Card>
              </div>

              <div className="flex justify-between gap-2 mt-6">
                <Button type="button" disabled={isSubmitting} onClick={onBack}>
                  Quay lại
                </Button>
                <div className="flex gap-2">
                  <Button type="button" disabled={isSubmitting} onClick={onCancel}>
                    Hủy
                  </Button>
                  <Button variant="solid" type="submit" loading={isSubmitting}>
                    Lưu báo cáo
                  </Button>
                </div>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
}
