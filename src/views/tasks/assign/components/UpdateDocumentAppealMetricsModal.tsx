import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { Button, DatePicker, Dialog, FormItem, Input, Textarea } from '@/components/ui'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'
import { useUpdateDocumentAppealMetrics } from '@/views/tasks/assign/hooks/useTask'
import { Task, UpdateDocumentAppealMetricsRequest } from '@/views/tasks/assign/types/task.type'
import { Field, FieldProps, Form, Formik } from 'formik'
import { HiOutlineDocumentText } from 'react-icons/hi'
import * as Yup from 'yup'

type Props = {
  isOpen: boolean
  task: Task | null
  onClose: () => void
}

const validationSchema = Yup.object().shape({
  appealDate: Yup.date().required('Ngày kháng giấy là bắt buộc'),
  projectId: Yup.string().required('Dự án là bắt buộc'),
  appealCount: Yup.number()
    .required('Số lượng đơn kháng là bắt buộc')
    .min(0, 'Số lượng đơn kháng phải lớn hơn hoặc bằng 0'),
  successCount: Yup.number()
    .required('Số lượng đơn thành công là bắt buộc')
    .min(0, 'Số lượng đơn thành công phải lớn hơn hoặc bằng 0')
    .test('max', 'Số lượng thành công không được lớn hơn số lượng đơn kháng', function (value) {
      const { appealCount } = this.parent
      return value <= appealCount
    }),
  note: Yup.string(),
})

export default function UpdateDocumentAppealMetricsModal({ isOpen, task, onClose }: Props) {
  const updateDocumentAppealMetricsMutation = useUpdateDocumentAppealMetrics()

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

  const initialValues: UpdateDocumentAppealMetricsRequest = {
    appealDate: '',
    projectId: '',
    appealCount: 0,
    successCount: 0,
    note: '',
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (values: UpdateDocumentAppealMetricsRequest) => {
    if (!task?.id) return

    await updateDocumentAppealMetricsMutation.mutateAsync({
      taskId: task.id,
      payload: values,
    })

    handleClose()
  }

  return (
    <>
      <Dialog isOpen={isOpen} width={600} onClose={handleClose} onRequestClose={handleClose}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
            <HiOutlineDocumentText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật chỉ số kháng giấy</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{task?.name}</p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleChange }) => (
            <Form>
              <div className="space-y-4 mb-6">
                <FormItem
                  asterisk
                  label="Ngày kháng giấy"
                  errorMessage={errors.appealDate as string}
                  invalid={touched.appealDate && Boolean(errors.appealDate)}
                >
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    placeholder="Chọn ngày kháng giấy"
                    value={values.appealDate ? new Date(values.appealDate) : null}
                    onChange={(date) => setFieldValue('appealDate', date)}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Dự án"
                  errorMessage={errors.projectId}
                  invalid={touched.projectId && Boolean(errors.projectId)}
                >
                  <Field name="projectId">
                    {({ field, form }: FieldProps) => (
                      <SelectCustom
                        isCreatable
                        field={field}
                        form={form}
                        fetchOptions={fetchProjectOptions}
                        placeholder="Chọn dự án..."
                      />
                    )}
                  </Field>
                </FormItem>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <FormItem
                    asterisk
                    label="Số lượng đơn kháng"
                    errorMessage={errors.appealCount as string}
                    invalid={touched.appealCount && Boolean(errors.appealCount)}
                  >
                    <Input
                      name="appealCount"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={values.appealCount}
                      onChange={handleChange}
                    />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Số lượng đơn thành công"
                    errorMessage={errors.successCount as string}
                    invalid={touched.successCount && Boolean(errors.successCount)}
                  >
                    <Input
                      name="successCount"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={values.successCount}
                      onChange={handleChange}
                    />
                  </FormItem>
                </div>

                <FormItem label="Ghi chú" errorMessage={errors.note} invalid={touched.note && Boolean(errors.note)}>
                  <Textarea
                    name="note"
                    placeholder="Nhập ghi chú..."
                    rows={3}
                    value={values.note}
                    onChange={handleChange}
                  />
                </FormItem>

                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tỷ lệ thành công:</span>
                    <span className="font-semibold text-green-600">
                      {values.appealCount > 0
                        ? `${((values.successCount / values.appealCount) * 100).toFixed(1)}%`
                        : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-600">Số lượng thất bại:</span>
                    <span className="font-semibold text-red-600">{values.appealCount - values.successCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="default" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="solid" type="submit" loading={updateDocumentAppealMetricsMutation.isPending}>
                  Cập nhật
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}
