import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import {
  useCreateProjectStatusMutation,
  useUpdateProjectStatusMutation,
} from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import type { CreateProjectStatusRequest } from '@/views/masterData/projectStatus/types'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên trạng thái'),
  description: Yup.string().nullable(),
  color: Yup.string().nullable(),
})

type ProjectStatusFormProps = {
  onClose: () => void
}

export default function ProjectStatusForm({ onClose }: ProjectStatusFormProps) {
  const { selectedProjectStatus } = useProjectStatusStore()

  const createMutation = useCreateProjectStatusMutation()
  const updateMutation = useUpdateProjectStatusMutation()

  const isEdit = !!selectedProjectStatus

  const initialValues: CreateProjectStatusRequest = {
    name: selectedProjectStatus?.name || '',
    description: selectedProjectStatus?.description || '',
    color: selectedProjectStatus?.color || '#3b82f6',
  }

  const handleSubmit = async (values: CreateProjectStatusRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: selectedProjectStatus.id,
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
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
        <Form>
          <FormContainer>
            <FormItem asterisk label="Tên trạng thái" invalid={errors.name && touched.name} errorMessage={errors.name}>
              <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên trạng thái" component={Input} />
            </FormItem>

            <FormItem label="Màu sắc" invalid={errors.color && touched.color} errorMessage={errors.color}>
              <div className="flex items-center gap-2">
                <Field type="color" name="color" className="border rounded w-20 h-10 cursor-pointer" />
                <Input value={values.color || ''} onChange={(e) => setFieldValue('color', e.target.value)} />
              </div>
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
