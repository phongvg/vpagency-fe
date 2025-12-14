import { Button, Dialog, FormContainer, FormItem, Input } from '@/components/ui'
import { GET_TASK_PROGRESS } from '@/utils/queryKey'
import { useCreateFinalUrlMutation } from '@/views/projects/hooks/useFinalUrl'
import { UpdateFinalUrlRequest } from '@/views/projects/types/finalUrl.type'
import { useUpdateTask } from '@/views/tasks/assign/hooks/useTask'
import { useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

type Props = {
  isOpen: boolean
  taskId: string
  projectId: string | undefined
  finalUrlIds: string[]
  onClose: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên URL là bắt buộc'),
  finalURL: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
})

export default function AddUrlModal({ isOpen, taskId, projectId, finalUrlIds, onClose }: Props) {
  const initialValues: UpdateFinalUrlRequest = {
    name: '',
    finalURL: '',
  }

  const createFinalUrlMutation = useCreateFinalUrlMutation()
  const updateTaskMutation = useUpdateTask()
  const queryClient = useQueryClient()

  const handleSubmit = async (values: UpdateFinalUrlRequest) => {
    await createFinalUrlMutation.mutateAsync(
      {
        name: values.name,
        finalURL: values.finalURL,
        projectId,
      },
      {
        onSuccess: async (response) => {
          const finalUrlId = response.data.data.id
          const updatedIds = [...finalUrlIds, finalUrlId]

          await updateTaskMutation.mutateAsync(
            { taskId, data: { finalUrlIds: updatedIds } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [GET_TASK_PROGRESS] })
                onClose()
              },
            },
          )
        },
      },
    )
  }

  return (
    <Dialog isOpen={isOpen} width={600} onClose={onClose} onRequestClose={onClose}>
      <h5 className="mb-4">Thêm URL</h5>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <FormContainer>
              <div className="space-y-3">
                <FormItem asterisk label="Tên URL" invalid={errors.name && touched.name} errorMessage={errors.name}>
                  <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên URL" component={Input} />
                </FormItem>

                <FormItem
                  asterisk
                  label="URL"
                  invalid={errors.finalURL && touched.finalURL}
                  errorMessage={errors.finalURL}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="finalURL"
                    placeholder="https://example.com"
                    component={Input}
                  />
                </FormItem>

                <div className="flex justify-end gap-2">
                  <Button variant="plain" onClick={onClose}>
                    Hủy
                  </Button>
                  <Button type="submit" variant="solid">
                    Lưu
                  </Button>
                </div>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
