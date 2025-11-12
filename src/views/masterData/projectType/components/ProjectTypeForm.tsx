import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import {
  useCreateProjectTypeMutation,
  useUpdateProjectTypeMutation,
} from '@/views/masterData/projectType/hooks/useProjectType'
import { useProjectTypeStore } from '@/views/masterData/projectType/store/useProjectTypeStore'
import type { CreateProjectTypeRequest } from '@/views/masterData/projectType/types'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên loại dự án'),
  description: Yup.string().nullable(),
})

type ProjectTypeFormProps = {
  onClose: () => void
}

export default function ProjectTypeForm({ onClose }: ProjectTypeFormProps) {
  const { selectedProjectType } = useProjectTypeStore()

  const createMutation = useCreateProjectTypeMutation()
  const updateMutation = useUpdateProjectTypeMutation()

  const isEdit = !!selectedProjectType

  const initialValues: CreateProjectTypeRequest = {
    name: selectedProjectType?.name || '',
    description: selectedProjectType?.description || '',
  }

  const handleSubmit = async (values: CreateProjectTypeRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: selectedProjectType.id,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
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
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FormContainer>
            <FormItem asterisk label="Tên loại dự án" invalid={errors.name && touched.name} errorMessage={errors.name}>
              <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên loại dự án" component={Input} />
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

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={onClose}>
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
