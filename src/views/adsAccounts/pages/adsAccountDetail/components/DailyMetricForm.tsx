import { Button, FormContainer, FormItem } from '@/components/ui'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDailyMetricStore } from '@/views/adsAccounts/pages/adsAccountDetail/store/useDailyMetricStore'
import {
  useCreateDailyMetricMutation,
  useGetDailyMetricByAdsAccountIdQuery,
  useUpdateDailyMetricMutation,
} from '@/views/adsAccounts/pages/adsAccountDetail/hooks/useDailyMetricQueries'
import { useMemo } from 'react'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import 'dayjs/locale/vi'
import { UpdateAdsAccountDailyMetricRequest } from '@/@types/adsAccountDailyMetric'

const validationSchema = Yup.object().shape({
  clicks: Yup.number().min(0, 'Clicks phải >= 0').required('Vui lòng nhập số clicks'),
  spent: Yup.number().min(0, 'Chi tiêu phải >= 0').required('Vui lòng nhập chi tiêu'),
})

type DailyMetricFormProps = {
  adsAccountId: string
  isOpen?: boolean
  onClose: () => void
}

export default function DailyMetricForm({ adsAccountId, isOpen, onClose }: DailyMetricFormProps) {
  const { dialogOpen } = useDailyMetricStore()
  const createMutation = useCreateDailyMetricMutation()
  const updateMutation = useUpdateDailyMetricMutation()

  const { data } = useGetDailyMetricByAdsAccountIdQuery(adsAccountId, dialogOpen || isOpen || false)

  const isEdit = !!data

  const initialValues = useMemo(
    () =>
      isEdit && data
        ? {
            clicks: data.clicks,
            spent: data.spent,
          }
        : {
            clicks: 0,
            spent: 0,
          },
    [isEdit, data],
  )

  const handleSubmit = async (values: UpdateAdsAccountDailyMetricRequest) => {
    if (isEdit && data) {
      await updateMutation.mutateAsync({
        id: data.id,
        payload: {
          clicks: Number(values.clicks),
          spent: Number(values.spent),
        },
      })
    } else {
      await createMutation.mutateAsync({
        adsAccountId,
        clicks: Number(values.clicks),
        spent: Number(values.spent),
      })
    }

    onClose()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form>
            <FormContainer>
              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="Lượt click"
                  invalid={touched.clicks && Boolean(errors.clicks)}
                  errorMessage={errors.clicks as string}
                >
                  <Field name="clicks">
                    {({ field, form }: FieldProps) => (
                      <FormCurrencyInput
                        form={form}
                        field={field}
                        placeholder="Nhập số lượt click"
                        inputSuffix="click"
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  label="Số tiền đã tiêu"
                  invalid={touched.spent && Boolean(errors.spent)}
                  errorMessage={errors.spent as string}
                >
                  <Field name="spent">
                    {({ field, form }: FieldProps) => (
                      <FormCurrencyInput form={form} field={field} placeholder="Nhập số tiền đã tiêu" />
                    )}
                  </Field>
                </FormItem>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" disabled={isSubmitting} onClick={onClose}>
                  Hủy
                </Button>
                <Button variant="solid" type="submit" loading={isSubmitting}>
                  Lưu
                </Button>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
}
