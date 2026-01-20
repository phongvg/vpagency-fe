import { Button, DatePicker, Dialog, FormItem, Select, Textarea } from '@/components/ui'
import { useUpdateResearchMetrics } from '@/views/tasks/assign/hooks/useTask'
import { Task, UpdateResearchMetricsRequest } from '@/views/tasks/assign/types/task.type'
import { Form, Formik } from 'formik'
import { HiOutlineDocumentText } from 'react-icons/hi'
import * as Yup from 'yup'

type Props = {
  isOpen: boolean
  task: Task | null
  onClose: () => void
}

const difficultyLevelOptions = [
  { value: 'LOW', label: 'Thấp' },
  { value: 'MEDIUM', label: 'Trung bình' },
  { value: 'HIGH', label: 'Cao' },
  { value: 'VERY_HIGH', label: 'Rất cao' },
]

const validationSchema = Yup.object().shape({
  researchDate: Yup.date().required('Ngày ghi kết quả nghiên cứu là bắt buộc'),
  result: Yup.string().required('Kết quả nghiên cứu là bắt buộc'),
  difficultyLevel: Yup.string().required('Mức độ khó là bắt buộc'),
})

export default function UpdateResearchMetricsModal({ isOpen, task, onClose }: Props) {
  const updateResearchMetricsMutation = useUpdateResearchMetrics()

  const initialValues: UpdateResearchMetricsRequest = {
    researchDate: '',
    result: '',
    difficultyLevel: '',
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (values: UpdateResearchMetricsRequest) => {
    if (!task?.id) return

    await updateResearchMetricsMutation.mutateAsync({
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
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật kết quả nghiên cứu</h3>
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
                  label="Ngày ghi kết quả nghiên cứu"
                  errorMessage={errors.researchDate as string}
                  invalid={touched.researchDate && Boolean(errors.researchDate)}
                >
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    placeholder="Chọn ngày ghi kết quả"
                    value={values.researchDate ? new Date(values.researchDate) : null}
                    onChange={(date) => setFieldValue('researchDate', date)}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Kết quả nghiên cứu"
                  errorMessage={errors.result}
                  invalid={touched.result && Boolean(errors.result)}
                >
                  <Textarea
                    name="result"
                    placeholder="Nhập kết quả nghiên cứu..."
                    rows={5}
                    value={values.result}
                    onChange={handleChange}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Mức độ khó"
                  errorMessage={errors.difficultyLevel}
                  invalid={touched.difficultyLevel && Boolean(errors.difficultyLevel)}
                >
                  <Select
                    name="difficultyLevel"
                    options={difficultyLevelOptions}
                    placeholder="Chọn mức độ khó"
                    value={difficultyLevelOptions.find((opt) => opt.value === values.difficultyLevel)}
                    onChange={(option: { value: string; label: string } | null) =>
                      setFieldValue('difficultyLevel', option?.value || '')
                    }
                  />
                </FormItem>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="default" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="solid" type="submit" loading={updateResearchMetricsMutation.isPending}>
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
