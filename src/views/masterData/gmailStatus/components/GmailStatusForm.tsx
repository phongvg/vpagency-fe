import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import {
  useCreateGmailStatusMutation,
  useGetGmailStatusDetailQuery,
  useUpdateGmailStatusMutation,
} from '@/views/masterData/gmailStatus/hooks/useGmailStatus'
import { useGmailStatusStore } from '@/views/masterData/gmailStatus/store/useGmailStatusStore'
import { UpdateGmailStatusRequest } from '@/views/masterData/gmailStatus/types/gmailStatus.type'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên trạng thái'),
  description: Yup.string().nullable(),
})

export default function GmailStatusForm() {
  const { gmailStatusId, dialogOpen, closeDialog } = useGmailStatusStore()
  const isEdit = !!gmailStatusId

  const { data: gmailStatus } = useGetGmailStatusDetailQuery(gmailStatusId!, dialogOpen)
  const createMutation = useCreateGmailStatusMutation()
  const updateMutation = useUpdateGmailStatusMutation()

  const initialValues: UpdateGmailStatusRequest = {
    name: gmailStatus?.name || '',
    description: gmailStatus?.description || '',
  }

  const handleSubmit = async (values: UpdateGmailStatusRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: gmailStatusId!,
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
