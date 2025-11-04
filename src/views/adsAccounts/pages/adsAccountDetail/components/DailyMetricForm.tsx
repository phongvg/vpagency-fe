import { Button, FormContainer, FormItem, Input, DatePicker } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDailyMetricStore } from '@/views/adsAccounts/pages/adsAccountDetail/store/useDailyMetricStore'
import {
  useCreateDailyMetricMutation,
  useUpdateDailyMetricMutation,
} from '@/views/adsAccounts/pages/adsAccountDetail/hooks/useDailyMetricQueries'
import { useMemo } from 'react'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import 'dayjs/locale/vi'
import { formatDate } from '@/helpers/formatDate'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Vui lòng chọn ngày'),
  clicks: Yup.number().min(0, 'Clicks phải >= 0').required('Vui lòng nhập số clicks'),
  spent: Yup.number().min(0, 'Chi tiêu phải >= 0').required('Vui lòng nhập chi tiêu'),
  cpc: Yup.number().min(0, 'CPC phải >= 0'),
})

type DailyMetricFormProps = {
  adsAccountId: string
  onClose: () => void
}

export default function DailyMetricForm({ adsAccountId, onClose }: DailyMetricFormProps) {
  const { selectedMetric } = useDailyMetricStore()
  const createMutation = useCreateDailyMetricMutation()
  const updateMutation = useUpdateDailyMetricMutation()

  const isEdit = !!selectedMetric

  const initialValues = useMemo(
    () =>
      isEdit && selectedMetric
        ? {
            date: new Date(selectedMetric.date),
            clicks: selectedMetric.clicks,
            spent: selectedMetric.spent,
            cpc: selectedMetric.cpc,
          }
        : {
            date: new Date(),
            clicks: 0,
            spent: 0,
            cpc: 0,
          },
    [isEdit, selectedMetric],
  )

  const handleSubmit = async (values: any) => {
    const calculatedCpc = values.clicks > 0 ? values.spent / values.clicks : 0

    if (isEdit && selectedMetric) {
      await updateMutation.mutateAsync({
        id: selectedMetric.id,
        payload: {
          date: formatDate(values.date, 'YYYY-MM-DD'),
          clicks: Number(values.clicks),
          spent: Number(values.spent),
          cpc: Number(values.cpc) || calculatedCpc,
        },
      })
    } else {
      await createMutation.mutateAsync({
        adsAccountId,
        date: formatDate(values.date, 'YYYY-MM-DD'),
        clicks: Number(values.clicks),
        spent: Number(values.spent),
        cpc: Number(values.cpc) || calculatedCpc,
      })
    }

    onClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting, values, setFieldValue }) => {
        const calculatedCpc = values.clicks > 0 ? values.spent / values.clicks : 0

        return (
          <Form>
            <FormContainer>
              <FormItem
                label="Ngày"
                invalid={touched.date && Boolean(errors.date)}
                errorMessage={errors.date as string}
              >
                <Field name="date">
                  {({ field }: any) => (
                    <DatePicker
                      {...field}
                      value={field.value}
                      onChange={(date) => setFieldValue('date', date)}
                      placeholder="Chọn ngày"
                      inputFormat="DD/MM/YYYY"
                      locale="vi"
                    />
                  )}
                </Field>
              </FormItem>

              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="Lượt click"
                  invalid={touched.clicks && Boolean(errors.clicks)}
                  errorMessage={errors.clicks as string}
                >
                  <Field name="clicks">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Nhập số lượt click"
                        onChange={(e) => {
                          const value = e.target.value
                          setFieldValue('clicks', value ? Number(value) : 0)
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  label="Chi tiêu (VND)"
                  invalid={touched.spent && Boolean(errors.spent)}
                  errorMessage={errors.spent as string}
                >
                  <Field name="spent">
                    {({ field, form }: any) => (
                      <FormCurrencyInput form={form} field={field} placeholder="Nhập số tiền chi tiêu" />
                    )}
                  </Field>
                </FormItem>
              </div>

              <FormItem
                label={`CPC (tự động: ${formatVietnameseMoney(calculatedCpc)})`}
                invalid={touched.cpc && Boolean(errors.cpc)}
                errorMessage={errors.cpc as string}
              >
                <Field name="cpc">
                  {({ field, form }: any) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập số tiền chi tiêu" />
                  )}
                </Field>
              </FormItem>

              {values.cpc > 0 && Math.abs(values.cpc - calculatedCpc) > 1 && (
                <div className="bg-yellow-50 p-3 rounded text-yellow-800 text-sm">
                  Cảnh báo: CPC nhập thủ công ({formatVietnameseMoney(values.cpc)}) khác CPC tự động tính (
                  {formatVietnameseMoney(calculatedCpc)})
                </div>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" onClick={onClose} disabled={isSubmitting}>
                  Hủy
                </Button>
                <Button variant="solid" type="submit" loading={isSubmitting}>
                  {isEdit ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
}
