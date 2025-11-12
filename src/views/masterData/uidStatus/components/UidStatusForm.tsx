import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { useCreateUidStatusMutation, useUpdateUidStatusMutation } from '@/views/masterData/uidStatus/hooks/useUidStatus'
import { useUidStatusStore } from '@/views/masterData/uidStatus/store/useUidStatusStore'
import type { CreateUidStatusRequest } from '@/views/masterData/uidStatus/types'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên trạng thái'),
  description: Yup.string().nullable(),
})

type UidStatusFormProps = {
  onClose: () => void
}

export default function UidStatusForm({ onClose }: UidStatusFormProps) {
  const { selectedUidStatus } = useUidStatusStore()

  const createMutation = useCreateUidStatusMutation()
  const updateMutation = useUpdateUidStatusMutation()

  const isEdit = !!selectedUidStatus

  const initialValues: CreateUidStatusRequest = {
    name: selectedUidStatus?.name || '',
    description: selectedUidStatus?.description || '',
  }

  const handleSubmit = async (values: CreateUidStatusRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: selectedUidStatus.id,
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
            <FormItem asterisk label="Tên trạng thái" invalid={errors.name && touched.name} errorMessage={errors.name}>
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
