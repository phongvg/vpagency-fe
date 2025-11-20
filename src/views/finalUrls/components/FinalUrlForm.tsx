import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useCreateFinalUrlMutation, useGetFinalUrlDetailQuery, useUpdateFinalUrlMutation } from '../hooks/useFinalUrl'
import { Formik, Form, Field, FieldProps } from 'formik'
import * as Yup from 'yup'
import { FormContainer, FormItem, Button, Input } from '@/components/ui'
import { UpdateFinalUrlRequest } from '../types/finalUrl.type'
import TagInput from '@/components/shared/TagInput'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  finalURL: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
  countries: Yup.array().of(Yup.string()).min(1, 'Vui lòng nhập ít nhất một quốc gia'),
  projectId: Yup.string().required('Dự án là bắt buộc'),
  title: Yup.string().nullable(),
  content: Yup.string().nullable(),
  targetRef: Yup.number().min(0, 'Giá trị phải >= 0'),
  targetCostPerRef: Yup.number().min(0, 'Giá trị phải >= 0'),
  targetFtd: Yup.number().min(0, 'Giá trị phải >= 0'),
  targetCostPerFtd: Yup.number().min(0, 'Giá trị phải >= 0'),
  targetDailyKeyVolume: Yup.number().min(0, 'Giá trị phải >= 0'),
  targetCpc: Yup.number().min(0, 'Giá trị phải >= 0'),
  budget: Yup.number().min(0, 'Giá trị phải >= 0'),
  suggestedBid: Yup.number().min(0, 'Giá trị phải >= 0'),
  totalClicks: Yup.number().min(0, 'Giá trị phải >= 0'),
  totalSpent: Yup.number().min(0, 'Giá trị phải >= 0'),
  totalRef: Yup.number().min(0, 'Giá trị phải >= 0'),
  totalFtd: Yup.number().min(0, 'Giá trị phải >= 0'),
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
    targetRef: finalUrl?.targetRef || 0,
    targetCostPerRef: finalUrl?.targetCostPerRef || 0,
    targetFtd: finalUrl?.targetFtd || 0,
    targetCostPerFtd: finalUrl?.targetCostPerFtd || 0,
    targetDailyKeyVolume: finalUrl?.targetDailyKeyVolume || 0,
    targetCpc: finalUrl?.targetCpc || 0,
    budget: finalUrl?.budget || 0,
    suggestedBid: finalUrl?.suggestedBid || 0,
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
            <div className="gap-4 grid grid-cols-2">
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
                    asterisk
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

              <div>
                <h5 className="mb-3 font-semibold text-base">Mục tiêu Ref</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    label="Mục tiêu số lượng Ref"
                    invalid={!!(errors.targetRef && touched.targetRef)}
                    errorMessage={errors.targetRef}
                  >
                    <Field name="targetRef" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    label="Chi phí/Ref"
                    invalid={!!(errors.targetCostPerRef && touched.targetCostPerRef)}
                    errorMessage={errors.targetCostPerRef}
                  >
                    <Field name="targetCostPerRef" component={Input} type="number" step="0.01" />
                  </FormItem>

                  <FormItem label="Tổng Ref">
                    <Field name="totalRefs" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Mục tiêu FTD</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    label="Mục tiêu số lượng FTD"
                    invalid={!!(errors.targetFtd && touched.targetFtd)}
                    errorMessage={errors.targetFtd}
                  >
                    <Field name="targetFtd" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    label="Chi phí/FTD"
                    invalid={!!(errors.targetCostPerFtd && touched.targetCostPerFtd)}
                    errorMessage={errors.targetCostPerFtd}
                  >
                    <Field name="targetCostPerFtd" component={Input} type="number" step="0.01" />
                  </FormItem>

                  <FormItem label="Tổng FTD">
                    <Field name="totalFtd" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Chỉ số hiệu suất</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    label="Volume key/ngày"
                    invalid={!!(errors.targetDailyKeyVolume && touched.targetDailyKeyVolume)}
                    errorMessage={errors.targetDailyKeyVolume}
                  >
                    <Field name="targetDailyKeyVolume" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    label="CPC"
                    invalid={!!(errors.targetCpc && touched.targetCpc)}
                    errorMessage={errors.targetCpc}
                  >
                    <Field name="targetCpc" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>

                  <FormItem label="Tổng lượt click">
                    <Field name="totalClicks" placeholder="0" component={Input} type="number" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Ngân sách</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    label="Ngân sách"
                    invalid={!!(errors.budget && touched.budget)}
                    errorMessage={errors.budget}
                  >
                    <Field name="budget">
                      {({ field, form }: FieldProps) => (
                        <FormCurrencyInput form={form} field={field} placeholder="Nhập ngân sách" />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    label="Giá thầu đề xuất"
                    invalid={!!(errors.suggestedBid && touched.suggestedBid)}
                    errorMessage={errors.suggestedBid}
                  >
                    <Field name="suggestedBid" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>

                  <FormItem label="Tổng chi tiêu">
                    <Field name="totalSpent">
                      {({ field, form }: FieldProps) => (
                        <FormCurrencyInput form={form} field={field} placeholder="Nhập chi tiêu" />
                      )}
                    </Field>
                  </FormItem>
                </div>
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
