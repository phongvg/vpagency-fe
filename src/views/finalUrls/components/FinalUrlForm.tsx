import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useCreateFinalUrlMutation, useGetFinalUrlDetailQuery, useUpdateFinalUrlMutation } from '../hooks/useFinalUrl'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FormContainer, FormItem, Button, Input, Switcher } from '@/components/ui'
import { UpdateFinalUrlRequest } from '../types/finalUrl.type'

const validationSchema = Yup.object().shape({
  campaignId: Yup.string().required('Campaign là bắt buộc'),
  name: Yup.string().required('Tên URL là bắt buộc'),
  url: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
  country: Yup.string().required('Quốc gia là bắt buộc'),
  title: Yup.string().nullable(),
  description: Yup.string().nullable(),
  content: Yup.string().nullable(),
  refTarget: Yup.number().min(0, 'Giá trị phải >= 0').required('Mục tiêu Ref là bắt buộc'),
  costPerRef: Yup.number().min(0, 'Giá trị phải >= 0').required('Chi phí/Ref là bắt buộc'),
  ftdTarget: Yup.number().min(0, 'Giá trị phải >= 0').required('Mục tiêu FTD là bắt buộc'),
  costPerFtd: Yup.number().min(0, 'Giá trị phải >= 0').required('Chi phí/FTD là bắt buộc'),
  volumeKeyPerDay: Yup.number().min(0, 'Giá trị phải >= 0').required('Volume key/ngày là bắt buộc'),
  estimatedRefPerDay: Yup.number().min(0, 'Giá trị phải >= 0').required('Dự tính Ref/ngày là bắt buộc'),
  cpc: Yup.number().min(0, 'Giá trị phải >= 0').required('CPC là bắt buộc'),
  budget: Yup.number().min(0, 'Giá trị phải >= 0').required('Ngân sách là bắt buộc'),
  suggestedBid: Yup.number().min(0, 'Giá trị phải >= 0').required('Giá thầu đề xuất là bắt buộc'),
  active: Yup.boolean(),
})

export default function FinalUrlForm() {
  const { finalUrlId, dialogOpen, closeDialog } = useFinalUrlStore()
  const isEdit = !!finalUrlId

  const { data: finalUrl } = useGetFinalUrlDetailQuery(finalUrlId!, dialogOpen)

  const createMutation = useCreateFinalUrlMutation()
  const updateMutation = useUpdateFinalUrlMutation()

  const initialValues: UpdateFinalUrlRequest = {
    campaignId: finalUrl?.campaignId || '',
    name: finalUrl?.name || '',
    url: finalUrl?.url || '',
    country: finalUrl?.country || '',
    title: finalUrl?.title || '',
    description: finalUrl?.description || '',
    content: finalUrl?.content || '',
    refTarget: finalUrl?.refTarget || 0,
    costPerRef: finalUrl?.costPerRef || 0,
    ftdTarget: finalUrl?.ftdTarget || 0,
    costPerFtd: finalUrl?.costPerFtd || 0,
    volumeKeyPerDay: finalUrl?.volumeKeyPerDay || 0,
    estimatedRefPerDay: finalUrl?.estimatedRefPerDay || 0,
    cpc: finalUrl?.cpc || 0,
    budget: finalUrl?.budget || 0,
    suggestedBid: finalUrl?.suggestedBid || 0,
    active: finalUrl?.active ?? true,
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
                  <FormItem
                    asterisk
                    label="Campaign ID"
                    invalid={!!(errors.campaignId && touched.campaignId)}
                    errorMessage={errors.campaignId}
                  >
                    <Field name="campaignId" placeholder="Nhập Campaign ID..." component={Input} />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Tên URL"
                    invalid={!!(errors.name && touched.name)}
                    errorMessage={errors.name}
                  >
                    <Field name="name" placeholder="Nhập tên dễ nhớ cho URL..." component={Input} />
                  </FormItem>

                  <FormItem asterisk label="URL" invalid={!!(errors.url && touched.url)} errorMessage={errors.url}>
                    <Field name="url" placeholder="https://example.com" component={Input} type="url" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Quốc gia"
                    invalid={!!(errors.country && touched.country)}
                    errorMessage={errors.country}
                  >
                    <Field name="country" placeholder="VN, US, JP..." component={Input} />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Nội dung</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    label="Tiêu đề"
                    className="col-span-2"
                    invalid={!!(errors.title && touched.title)}
                    errorMessage={errors.title}
                  >
                    <Field name="title" placeholder="Nhập tiêu đề..." component={Input} />
                  </FormItem>

                  <FormItem
                    label="Mô tả"
                    invalid={!!(errors.description && touched.description)}
                    errorMessage={errors.description}
                  >
                    <Field textArea name="description" placeholder="Nhập mô tả..." component={Input} rows={3} />
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
                    asterisk
                    label="Mục tiêu số lượng Ref"
                    invalid={!!(errors.refTarget && touched.refTarget)}
                    errorMessage={errors.refTarget}
                  >
                    <Field name="refTarget" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Chi phí/Ref (Target)"
                    invalid={!!(errors.costPerRef && touched.costPerRef)}
                    errorMessage={errors.costPerRef}
                  >
                    <Field name="costPerRef" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Mục tiêu FTD</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    asterisk
                    label="Mục tiêu số lượng FTD"
                    invalid={!!(errors.ftdTarget && touched.ftdTarget)}
                    errorMessage={errors.ftdTarget}
                  >
                    <Field name="ftdTarget" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Chi phí/FTD (Target)"
                    invalid={!!(errors.costPerFtd && touched.costPerFtd)}
                    errorMessage={errors.costPerFtd}
                  >
                    <Field name="costPerFtd" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Chỉ số hiệu suất</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    asterisk
                    label="Volume key/ngày"
                    invalid={!!(errors.volumeKeyPerDay && touched.volumeKeyPerDay)}
                    errorMessage={errors.volumeKeyPerDay}
                  >
                    <Field name="volumeKeyPerDay" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Dự tính Ref/ngày"
                    invalid={!!(errors.estimatedRefPerDay && touched.estimatedRefPerDay)}
                    errorMessage={errors.estimatedRefPerDay}
                  >
                    <Field name="estimatedRefPerDay" placeholder="0" component={Input} type="number" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="CPC (Cost Per Click)"
                    invalid={!!(errors.cpc && touched.cpc)}
                    errorMessage={errors.cpc}
                  >
                    <Field name="cpc" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-semibold text-base">Ngân sách</h5>

                <div className="gap-4 grid grid-cols-2">
                  <FormItem
                    asterisk
                    label="Ngân sách"
                    invalid={!!(errors.budget && touched.budget)}
                    errorMessage={errors.budget}
                  >
                    <Field name="budget" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Giá thầu đề xuất"
                    invalid={!!(errors.suggestedBid && touched.suggestedBid)}
                    errorMessage={errors.suggestedBid}
                  >
                    <Field name="suggestedBid" placeholder="0.00" component={Input} type="number" step="0.01" />
                  </FormItem>
                </div>
              </div>

              <div>
                <FormItem label="Trạng thái">
                  <Switcher checked={values.active} onChange={(checked) => setFieldValue('active', checked)} />
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
