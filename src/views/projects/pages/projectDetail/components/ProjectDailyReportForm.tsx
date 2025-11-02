import { Button, FormContainer, FormItem, Input, DatePicker } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import {
  useCreateProjectDailyReportMutation,
  useUpdateProjectDailyReportMutation,
} from '@/views/projects/pages/projectDetail/hooks/useProjectDailyReportQueries'
import { toastSuccess } from '@/utils/toast'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import UserSelect from '@/components/ui/UserSelect/UserSelect'
import 'dayjs/locale/vi'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Vui lòng chọn ngày'),
  totalSpent: Yup.number().min(0, 'Chi tiêu phải >= 0'),
  totalClicks: Yup.number().min(0, 'Clicks phải >= 0'),
  totalCpc: Yup.number().min(0, 'CPC phải >= 0'),
  highestCpc: Yup.number().min(0, 'CPC cao nhất phải >= 0'),
  totalRef: Yup.number().min(0, 'REF phải >= 0'),
  costPerRef: Yup.number().min(0, 'Chi phí/REF phải >= 0'),
  totalFtd: Yup.number().min(0, 'FTD phải >= 0'),
  costPerFtd: Yup.number().min(0, 'Chi phí/FTD phải >= 0'),
})

type ProjectDailyReportFormProps = {
  projectId: string
  onClose: () => void
}

export default function ProjectDailyReportForm({ projectId, onClose }: ProjectDailyReportFormProps) {
  const { selectedReport } = useProjectDailyReportStore()
  const createMutation = useCreateProjectDailyReportMutation()
  const updateMutation = useUpdateProjectDailyReportMutation()

  const isEdit = !!selectedReport

  const initialValues = useMemo(
    () =>
      isEdit && selectedReport
        ? {
            date: new Date(selectedReport.date),
            runnerId: selectedReport.runnerId || undefined,
            linkDeployed: selectedReport.linkDeployed || '',
            totalSpent: selectedReport.totalSpent,
            totalClicks: selectedReport.totalClicks,
            totalCpc: selectedReport.totalCpc,
            highestCpc: selectedReport.highestCpc,
            totalRef: selectedReport.totalRef,
            costPerRef: selectedReport.costPerRef,
            totalFtd: selectedReport.totalFtd,
            costPerFtd: selectedReport.costPerFtd,
          }
        : {
            date: new Date(),
            runnerId: undefined,
            linkDeployed: '',
            totalSpent: 0,
            totalClicks: 0,
            totalCpc: 0,
            highestCpc: 0,
            totalRef: 0,
            costPerRef: 0,
            totalFtd: 0,
            costPerFtd: 0,
          },
    [isEdit, selectedReport],
  )

  const handleSubmit = async (values: any) => {
    try {
      if (isEdit && selectedReport) {
        await updateMutation.mutateAsync({
          id: selectedReport.id,
          payload: {
            date: dayjs(values.date).format('YYYY-MM-DD'),
            runnerId: values.runnerId || undefined,
            linkDeployed: values.linkDeployed || undefined,
            totalSpent: Number(values.totalSpent),
            totalClicks: Number(values.totalClicks),
            totalCpc: Number(values.totalCpc),
            highestCpc: Number(values.highestCpc),
            totalRef: Number(values.totalRef),
            costPerRef: Number(values.costPerRef),
            totalFtd: Number(values.totalFtd),
            costPerFtd: Number(values.costPerFtd),
          },
        })
        toastSuccess('Cập nhật báo cáo thành công')
      } else {
        await createMutation.mutateAsync({
          projectId,
          date: dayjs(values.date).format('YYYY-MM-DD'),
          runnerId: values.runnerId || undefined,
          linkDeployed: values.linkDeployed || undefined,
          totalSpent: Number(values.totalSpent),
          totalClicks: Number(values.totalClicks),
          totalCpc: Number(values.totalCpc),
          highestCpc: Number(values.highestCpc),
          totalRef: Number(values.totalRef),
          costPerRef: Number(values.costPerRef),
          totalFtd: Number(values.totalFtd),
          costPerFtd: Number(values.costPerFtd),
        })
        toastSuccess('Thêm báo cáo thành công')
      }
      onClose()
    } catch {
      // Error handled by mutation
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <FormContainer>
              <div className="gap-4 grid grid-cols-2">
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

                <FormItem label="Người chạy">
                  <Field name="runnerId">
                    {({ field }: any) => (
                      <UserSelect
                        value={field.value}
                        onChange={(option) => setFieldValue('runnerId', option?.value)}
                        placeholder="Chọn người chạy"
                      />
                    )}
                  </Field>
                </FormItem>
              </div>

              <FormItem label="Link đã triển khai">
                <Field name="linkDeployed">{({ field }: any) => <Input {...field} placeholder="Nhập link" />}</Field>
              </FormItem>

              <div className="gap-4 grid grid-cols-3">
                <FormItem
                  label="Tổng chi tiêu"
                  invalid={touched.totalSpent && Boolean(errors.totalSpent)}
                  errorMessage={errors.totalSpent as string}
                >
                  <Field name="totalSpent">
                    {({ field, form }: any) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>

                <FormItem
                  label="Tổng lượt click"
                  invalid={touched.totalClicks && Boolean(errors.totalClicks)}
                  errorMessage={errors.totalClicks as string}
                >
                  <Field name="totalClicks">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        onChange={(e) => setFieldValue('totalClicks', Number(e.target.value) || 0)}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  label="CPC trung bình"
                  invalid={touched.totalCpc && Boolean(errors.totalCpc)}
                  errorMessage={errors.totalCpc as string}
                >
                  <Field name="totalCpc">
                    {({ field, form }: any) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="CPC cao nhất"
                  invalid={touched.highestCpc && Boolean(errors.highestCpc)}
                  errorMessage={errors.highestCpc as string}
                >
                  <Field name="highestCpc">
                    {({ field, form }: any) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>

                <FormItem
                  label="Tổng REF"
                  invalid={touched.totalRef && Boolean(errors.totalRef)}
                  errorMessage={errors.totalRef as string}
                >
                  <Field name="totalRef">
                    {({ field, form }: any) => (
                      <FormCurrencyInput form={form} field={field} placeholder="0" inputSuffix="" />
                    )}
                  </Field>
                </FormItem>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="Chi phí/REF"
                  invalid={touched.costPerRef && Boolean(errors.costPerRef)}
                  errorMessage={errors.costPerRef as string}
                >
                  <Field name="costPerRef">
                    {({ field, form }: any) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>

                <FormItem
                  label="Tổng FTD"
                  invalid={touched.totalFtd && Boolean(errors.totalFtd)}
                  errorMessage={errors.totalFtd as string}
                >
                  <Field name="totalFtd">
                    {({ field, form }: any) => (
                      <FormCurrencyInput form={form} field={field} placeholder="0" inputSuffix="" />
                    )}
                  </Field>
                </FormItem>
              </div>

              <FormItem
                label="Chi phí/FTD"
                invalid={touched.costPerFtd && Boolean(errors.costPerFtd)}
                errorMessage={errors.costPerFtd as string}
              >
                <Field name="costPerFtd">
                  {({ field, form }: any) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                </Field>
              </FormItem>

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
