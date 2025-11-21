import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useCreateFinalUrlMutation, useGetFinalUrlDetailQuery, useUpdateFinalUrlMutation } from '../hooks/useFinalUrl'
import { Formik, Form, Field, FieldProps } from 'formik'
import * as Yup from 'yup'
import { FormContainer, FormItem, Button, Input } from '@/components/ui'
import { UpdateFinalUrlRequest } from '../types/finalUrl.type'
import TagInput from '@/components/shared/TagInput'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  finalURL: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
  countries: Yup.array().of(Yup.string()),
  projectId: Yup.string().required('Dự án là bắt buộc'),
  title: Yup.string().nullable(),
  content: Yup.string().nullable(),
})

export default function FinalUrlForm() {
  const { finalUrlId, dialogOpen, closeDialog } = useFinalUrlStore()
  const isEdit = !!finalUrlId

  const { data: finalUrl } = useGetFinalUrlDetailQuery(finalUrlId!, dialogOpen)

  const createMutation = useCreateFinalUrlMutation()
  const updateMutation = useUpdateFinalUrlMutation()

  const initialValues: UpdateFinalUrlRequest = {
    name: finalUrl?.name || '',
    finalURL: finalUrl?.finalURL || '',
    countries: finalUrl?.countries || [],
    projectId: finalUrl?.projectId || '',
    title: finalUrl?.title || '',
    content: finalUrl?.content || '',
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

  const handleSubmit = async (values: UpdateFinalUrlRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        finalUrlId: finalUrlId!,
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
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            <div>
              <h5 className="mb-3 font-semibold text-base">Thông tin cơ bản</h5>

              <div className="gap-4 grid grid-cols-2">
                <FormItem asterisk label="Tên" invalid={!!(errors.name && touched.name)} errorMessage={errors.name}>
                  <Field name="name" placeholder="Nhập tên dễ nhớ cho URL..." component={Input} />
                </FormItem>

                <FormItem
                  asterisk
                  label="URL"
                  invalid={!!(errors.finalURL && touched.finalURL)}
                  errorMessage={errors.finalURL}
                >
                  <Field name="finalURL" type="url" placeholder="https://example.com" component={Input} />
                </FormItem>

                <FormItem
                  asterisk
                  label="Dự án"
                  invalid={!!(errors.projectId && touched.projectId)}
                  errorMessage={errors.projectId}
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

                <FormItem
                  label="Quốc gia"
                  invalid={!!(errors.countries && touched.countries)}
                  errorMessage={errors.countries}
                >
                  <TagInput
                    value={values.countries || []}
                    placeholder="Nhập quốc gia..."
                    onChange={(tags) => setFieldValue('countries', tags)}
                  />
                </FormItem>
              </div>
            </div>

            <div>
              <h5 className="mb-3 font-semibold text-base">Nội dung</h5>

              <div className="gap-4 grid grid-cols-1">
                <FormItem label="Tiêu đề" invalid={!!(errors.title && touched.title)} errorMessage={errors.title}>
                  <Field name="title" placeholder="Nhập tiêu đề..." component={Input} />
                </FormItem>

                <FormItem
                  label="Nội dung"
                  invalid={!!(errors.content && touched.content)}
                  errorMessage={errors.content}
                >
                  <Field textArea name="content" placeholder="Nhập nội dung chi tiết..." component={Input} rows={3} />
                </FormItem>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" onClick={closeDialog}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
