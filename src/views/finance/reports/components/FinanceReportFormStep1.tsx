import { Button, DatePicker, FormItem, FormContainer } from '@/components/ui'
import { Formik, Form, Field, FieldProps } from 'formik'
import * as Yup from 'yup'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'
import { useGenerateProjectDailyReportMutation } from '@/views/finance/reports/hooks/useProjectDailyStat'
import { ProjectDailyStat } from '@/views/finance/reports/types/ProjectDailyStat.type'

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required('Vui lòng chọn dự án'),
  date: Yup.string().required('Vui lòng chọn ngày'),
})

type Props = {
  onSuccess: (data: ProjectDailyStat) => void
  onCancel: () => void
}

export default function FinanceReportFormStep1({ onSuccess, onCancel }: Props) {
  const generateReportMutation = useGenerateProjectDailyReportMutation()

  const initialValues = {
    projectId: '',
    date: '',
  }

  const fetchProjectOptions = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetProjectList({ search: search || '', page, limit })
      const { items, meta } = response.data.data
      return {
        data: items,
        total: meta.total,
        hasMore: meta.hasNext,
      }
    } catch {
      return { data: [], total: 0, hasMore: false }
    }
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await generateReportMutation.mutateAsync({
        projectId: values.projectId,
        date: values.date,
      })

      console.log('Generated data:', response.data.data)
      onSuccess(response.data.data)
    } catch (error) {
      console.error('Error generating report:', error)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            <div className="gap-4 grid grid-cols-1 mt-4 mb-6">
              <FormItem
                asterisk
                label="Chọn dự án"
                invalid={!!(errors.projectId && touched.projectId)}
                errorMessage={errors.projectId as string}
              >
                <Field name="projectId">
                  {({ field, form }: FieldProps) => (
                    <SelectCustom
                      isCreatable
                      field={field}
                      form={form}
                      fetchOptions={fetchProjectOptions}
                      placeholder="Chọn dự án..."
                      onChange={(value) => {
                        form.setFieldValue('projectId', value)
                      }}
                    />
                  )}
                </Field>
              </FormItem>

              <FormItem
                asterisk
                label="Chọn ngày báo cáo"
                invalid={!!(errors.date && touched.date)}
                errorMessage={errors.date as string}
              >
                <DatePicker
                  placeholder="dd/mm/yyyy"
                  inputFormat="DD/MM/YYYY"
                  value={values.date ? new Date(values.date) : null}
                  onChange={(date) => setFieldValue('date', date ? date.toISOString() : '')}
                />
              </FormItem>
            </div>

            <div className="bg-blue-50 mb-6 p-4 border border-blue-200 rounded">
              <p className="text-blue-800 text-sm">
                <strong>Lưu ý:</strong> Hệ thống sẽ tự động tính toán các chỉ số báo cáo dựa trên dữ liệu chiến dịch và
                dự án đã có.
              </p>
              <ul className="mt-2 text-blue-700 text-sm list-disc list-inside">
                <li>Tổng chi tiêu, click, CPC từ dữ liệu chiến dịch</li>
                <li>Quốc gia đang cắn từ thống kê location</li>
                <li>Volume key, dự tính Ref từ thông tin dự án</li>
                <li>Các chỉ số khác sẽ được tính toán tự động</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" disabled={isSubmitting} onClick={onCancel}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                Tạo báo cáo
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
