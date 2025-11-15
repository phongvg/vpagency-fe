import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import {
  useCreateProjectStatusMutation,
  useGetProjectStatusDetailQuery,
  useUpdateProjectStatusMutation,
} from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import type { CreateProjectStatusRequest } from '@/views/masterData/projectStatus/types/projectStatus.type'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên trạng thái'),
  description: Yup.string().nullable(),
})

export default function ProjectStatusForm() {
  const { projectStatusId, dialogOpen, closeDialog } = useProjectStatusStore()
  const isEdit = !!projectStatusId

  const { data: projectStatus } = useGetProjectStatusDetailQuery(projectStatusId!, dialogOpen)
  const createMutation = useCreateProjectStatusMutation()
  const updateMutation = useUpdateProjectStatusMutation()

  const initialValues: CreateProjectStatusRequest = {
    name: projectStatus?.name || '',
    description: projectStatus?.description || '',
  }

  const handleSubmit = async (values: CreateProjectStatusRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: projectStatusId!,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }

    closeDialog()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FormContainer>
            <div className="gap-4 grid">
              <FormItem
                asterisk
                label="Tên trạng thái"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
              >
                <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên trạng thái" component={Input} />
              </FormItem>

              <FormItem
                label="Mô tả"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
              >
                <Field
                  textArea
                  type="text"
                  autoComplete="off"
                  name="description"
                  placeholder="Nhập mô tả"
                  component={Input}
                  rows={4}
                />
              </FormItem>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={closeDialog}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
