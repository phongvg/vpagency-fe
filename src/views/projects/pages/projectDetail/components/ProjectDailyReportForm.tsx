import { Button, FormContainer, FormItem, Input, DatePicker } from '@/components/ui'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import { useUpdateProjectDailyReportMutation } from '@/views/projects/pages/projectDetail/hooks/useProjectDailyReportQueries'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import 'dayjs/locale/vi'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Vui lòng chọn ngày'),
  totalSpent: Yup.number().min(0, 'Chi tiêu phải >= 0'),
  totalClicks: Yup.number().min(0, 'Lượt click phải >= 0'),
  totalCpc: Yup.number().min(0, 'CPC phải >= 0'),
  highestCpc: Yup.number().min(0, 'CPC cao nhất phải >= 0'),
})

type ProjectDailyReportFormProps = {
  onClose: () => void
}

export default function ProjectDailyReportForm({ onClose }: ProjectDailyReportFormProps) {
  const { selectedReport } = useProjectDailyReportStore()

  const updateMutation = useUpdateProjectDailyReportMutation()

  const [runnerSelected, setRunnerSelected] = useState<UserOption | null>(null)

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
          }
        : {
            date: new Date(),
            runnerId: undefined,
            linkDeployed: '',
            totalSpent: 0,
            totalClicks: 0,
            totalCpc: 0,
            highestCpc: 0,
          },
    [isEdit, selectedReport],
  )

  useEffect(() => {
    if (isEdit && selectedReport && selectedReport.runner) {
      setRunnerSelected({
        value: selectedReport.runner.id,
        label: `${selectedReport.runner.firstName || ''} ${selectedReport.runner.lastName || ''} (${
          selectedReport.runner.username
        })`.trim(),
        user: selectedReport.runner,
      })
    }
  }, [isEdit, selectedReport])

  const handleSubmit = async (values: any) => {
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
        },
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
                    {({ field }: FieldProps) => (
                      <DatePicker
                        {...field}
                        value={field.value}
                        placeholder="Chọn ngày"
                        inputFormat="DD/MM/YYYY"
                        locale="vi"
                        onChange={(date) => setFieldValue('date', date)}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem label="Người chạy">
                  <UserSelect
                    isClearable
                    value={runnerSelected}
                    placeholder="Chọn người chạy"
                    onChange={(option) => {
                      setRunnerSelected(option)
                      setFieldValue('runnerId', option ? option.value : undefined)
                    }}
                  />
                </FormItem>
              </div>

              <FormItem label="Link đã triển khai">
                <Field name="linkDeployed">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Nhập link" />}
                </Field>
              </FormItem>

              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="Tổng chi tiêu"
                  invalid={touched.totalSpent && Boolean(errors.totalSpent)}
                  errorMessage={errors.totalSpent as string}
                >
                  <Field name="totalSpent">
                    {({ field, form }: FieldProps) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>

                <FormItem
                  label="Tổng lượt click"
                  invalid={touched.totalClicks && Boolean(errors.totalClicks)}
                  errorMessage={errors.totalClicks as string}
                >
                  <Field name="totalClicks">
                    {({ field }: FieldProps) => (
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
                    {({ field, form }: FieldProps) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>

                <FormItem
                  label="CPC cao nhất"
                  invalid={touched.highestCpc && Boolean(errors.highestCpc)}
                  errorMessage={errors.highestCpc as string}
                >
                  <Field name="highestCpc">
                    {({ field, form }: FieldProps) => <FormCurrencyInput form={form} field={field} placeholder="0" />}
                  </Field>
                </FormItem>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" disabled={isSubmitting} onClick={onClose}>
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
