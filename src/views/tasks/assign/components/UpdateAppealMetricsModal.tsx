import { Button, DatePicker, Dialog, FormItem, Input, Textarea } from '@/components/ui'
import { useUpdateAppealMetrics } from '@/views/tasks/assign/hooks/useTask'
import { Task, UpdateAppealMetricsRequest } from '@/views/tasks/assign/types/task.type'
import { Form, Formik } from 'formik'
import { HiOutlineDocumentText } from 'react-icons/hi'
import * as Yup from 'yup'

type Props = {
  isOpen: boolean
  task: Task | null
  onClose: () => void
}

const validationSchema = Yup.object().shape({
  appealDate: Yup.date().required('Ngày kháng tài khoản là bắt buộc'),
  suspensionReason: Yup.string().required('Nguyên nhân tạm ngưng là bắt buộc'),
  appealCount: Yup.number().required('Số lượng kháng là bắt buộc').min(0, 'Số lượng kháng phải lớn hơn hoặc bằng 0'),
  successCount: Yup.number()
    .required('Số lượng thành công là bắt buộc')
    .min(0, 'Số lượng thành công phải lớn hơn hoặc bằng 0'),
  failureCount: Yup.number()
    .required('Số lượng thất bại là bắt buộc')
    .min(0, 'Số lượng thất bại phải lớn hơn hoặc bằng 0'),
})

export default function UpdateAppealMetricsModal({ isOpen, task, onClose }: Props) {
  const updateAppealMetricsMutation = useUpdateAppealMetrics()

  const initialValues: UpdateAppealMetricsRequest = {
    appealDate: '',
    suspensionReason: '',
    appealCount: 0,
    successCount: 0,
    failureCount: 0,
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (values: UpdateAppealMetricsRequest) => {
    if (!task?.id) return

    await updateAppealMetricsMutation.mutateAsync({
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
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật chỉ số kháng</h3>
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
                  label="Ngày kháng tài khoản"
                  errorMessage={errors.appealDate as string}
                  invalid={touched.appealDate && Boolean(errors.appealDate)}
                >
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    placeholder="Chọn ngày kháng tài khoản"
                    value={values.appealDate ? new Date(values.appealDate) : null}
                    onChange={(date) => setFieldValue('appealDate', date)}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Nguyên nhân tạm ngưng"
                  errorMessage={errors.suspensionReason}
                  invalid={touched.suspensionReason && Boolean(errors.suspensionReason)}
                >
                  <Textarea
                    name="suspensionReason"
                    placeholder="Nhập nguyên nhân tạm ngưng..."
                    rows={3}
                    value={values.suspensionReason}
                    onChange={handleChange}
                  />
                </FormItem>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                  <FormItem
                    asterisk
                    label="Số lượng kháng"
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
                    label="Số lượng thành công"
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

                  <FormItem
                    asterisk
                    label="Số lượng thất bại"
                    errorMessage={errors.failureCount as string}
                    invalid={touched.failureCount && Boolean(errors.failureCount)}
                  >
                    <Input
                      name="failureCount"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={values.failureCount}
                      onChange={handleChange}
                    />
                  </FormItem>
                </div>

                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tỷ lệ thành công:</span>
                    <span className="font-semibold text-red-500">
                      {values.appealCount > 0
                        ? `${((values.successCount / values.appealCount) * 100).toFixed(1)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="default" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="solid" type="submit" loading={updateAppealMetricsMutation.isPending}>
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
