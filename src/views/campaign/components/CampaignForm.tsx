import { Button, DatePicker, FormContainer, FormItem, Input, Textarea } from '@/components/ui'
import {
  useCreateCampaignMutation,
  useGetCampaignDetailQuery,
  useUpdateCampaignMutation,
} from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TagInput from '@/components/shared/TagInput'
import NumberInput from '@/components/shared/NumberInput'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'

const validationSchema = Yup.object().shape({
  datePull: Yup.date(),
  dateData: Yup.date(),
  uid: Yup.string(),
  mcc: Yup.string(),
  campaignName: Yup.string().required('Vui lòng nhập tên chiến dịch'),
  campaignId: Yup.number().required('Vui lòng nhập ID chiến dịch'),
  finalUrl: Yup.string().url('URL không hợp lệ'),
  keyword: Yup.array().of(Yup.string()),
  match: Yup.array().of(Yup.string()),
  searchTerm: Yup.array().of(Yup.string()),
  cpcSearchTerm: Yup.array().of(Yup.number()),
  costSearchTerm: Yup.array().of(Yup.number()),
  statusCampaign: Yup.string(),
  avgCpc: Yup.number(),
  micros: Yup.number(),
  click: Yup.number(),
  ctr: Yup.number(),
  cpm: Yup.number(),
  cost: Yup.number(),
  locationTarget: Yup.array().of(Yup.string()),
  spendingCountry: Yup.number(),
  cpcCountry: Yup.number(),
  ctrCountry: Yup.number(),
  clickCountry: Yup.number(),
  costCountry: Yup.number(),
})

export default function CampaignForm() {
  const { campaignId, dialogOpen, closeDialog } = useCampaignStore()

  const isEdit = !!campaignId

  const { data: campaign } = useGetCampaignDetailQuery(campaignId!, dialogOpen)
  const createMutation = useCreateCampaignMutation()
  const updateMutation = useUpdateCampaignMutation()

  const initialValues: UpdateCampaignRequest = {
    datePull: campaign?.datePull || '',
    dateData: campaign?.dateData || '',
    uid: campaign?.uid || '',
    mcc: campaign?.mcc || '',
    campaignName: campaign?.campaignName || '',
    campaignId: campaign?.campaignId || '',
    finalUrl: campaign?.finalUrl || '',
    keyword: campaign?.keyword || [],
    match: campaign?.match || [],
    searchTerm: campaign?.searchTerm || [],
    cpcSearchTerm: campaign?.cpcSearchTerm || [],
    costSearchTerm: campaign?.costSearchTerm || [],
    statusCampaign: campaign?.statusCampaign || '',
    avgCpc: campaign?.avgCpc || 0,
    micros: campaign?.micros || 0,
    click: campaign?.click || 0,
    ctr: campaign?.ctr || 0,
    cpm: campaign?.cpm || 0,
    cost: campaign?.cost || 0,
    locationTarget: campaign?.locationTarget || [],
    spendingCountry: campaign?.spendingCountry || 0,
    cpcCountry: campaign?.cpcCountry || 0,
    ctrCountry: campaign?.ctrCountry || 0,
    clickCountry: campaign?.clickCountry || 0,
    costCountry: campaign?.costCountry || 0,
  }

  const handleSubmit = async (values: UpdateCampaignRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        campaignId,
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
            <div className="gap-4 grid grid-cols-3">
              <FormItem
                asterisk
                label="ID chiến dịch"
                invalid={errors.campaignId && touched.campaignId}
                errorMessage={errors.campaignId}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="campaignId"
                  placeholder="Nhập ID chiến dịch..."
                  component={Input}
                />
              </FormItem>

              <FormItem
                asterisk
                label="Tên chiến dịch"
                invalid={errors.campaignName && touched.campaignName}
                errorMessage={errors.campaignName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="campaignName"
                  placeholder="Nhập tên chiến dịch..."
                  component={Input}
                />
              </FormItem>

              <FormItem label="UID" invalid={errors.uid && touched.uid} errorMessage={errors.uid}>
                <Field type="text" autoComplete="off" name="uid" placeholder="Nhập UID..." component={Input} />
              </FormItem>

              <FormItem label="MCC" invalid={errors.mcc && touched.mcc} errorMessage={errors.mcc}>
                <Field type="text" autoComplete="off" name="mcc" placeholder="Nhập MCC..." component={Input} />
              </FormItem>

              <FormItem
                label="URL cuối cùng"
                invalid={errors.finalUrl && touched.finalUrl}
                errorMessage={errors.finalUrl}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="finalUrl"
                  placeholder="Nhập URL cuối cùng..."
                  component={Input}
                />
              </FormItem>

              <FormItem label="Ngày kéo">
                <DatePicker
                  value={values.datePull ? new Date(values.datePull) : null}
                  placeholder="dd/mm/yyyy"
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => setFieldValue('datePull', date ? date.toISOString().split('T')[0] : '')}
                />
              </FormItem>

              <FormItem label="Ngày dữ liệu">
                <DatePicker
                  value={values.dateData ? new Date(values.dateData) : null}
                  placeholder="dd/mm/yyyy"
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => setFieldValue('dateData', date ? date.toISOString().split('T')[0] : '')}
                />
              </FormItem>

              <FormItem label="Từ khóa">
                <TagInput
                  value={values.keyword || []}
                  placeholder="Nhập từ khóa..."
                  onChange={(tags) => setFieldValue('keyword', tags)}
                />
              </FormItem>

              <FormItem label="Phù hợp">
                <TagInput
                  value={values.match || []}
                  placeholder="Nhập match type..."
                  onChange={(tags) => setFieldValue('match', tags)}
                />
              </FormItem>

              <FormItem label="Thuật ngữ tìm kiếm">
                <TagInput
                  value={values.searchTerm || []}
                  placeholder="Nhập search term..."
                  onChange={(tags) => setFieldValue('searchTerm', tags)}
                />
              </FormItem>

              <FormItem label="CPC tìm kiếm">
                <Field
                  name="cpcSearchTerm"
                  placeholder="Nhập CPC (phân cách bằng dấu phẩy)..."
                  component={Textarea}
                  rows={2}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const values = e.target.value
                      .split(',')
                      .map((v) => parseFloat(v.trim()))
                      .filter((v) => !isNaN(v))
                    setFieldValue('cpcSearchTerm', values)
                  }}
                />
              </FormItem>

              <FormItem label="Chi phí của từng CPC">
                <Field
                  name="costSearchTerm"
                  placeholder="Nhập cost (phân cách bằng dấu phẩy)..."
                  component={Textarea}
                  rows={2}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const values = e.target.value
                      .split(',')
                      .map((v) => parseFloat(v.trim()))
                      .filter((v) => !isNaN(v))
                    setFieldValue('costSearchTerm', values)
                  }}
                />
              </FormItem>

              <FormItem label="Trạng thái chiến dịch">
                <Field
                  type="text"
                  name="statusCampaign"
                  placeholder="Nhập trạng thái..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('statusCampaign', e.target.value)}
                />
              </FormItem>

              <FormItem label="CPC trung bình">
                <Field name="avgCpc">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập CPC trung bình" />
                  )}
                </Field>
              </FormItem>

              <FormItem label="Thầu chung (Micros)">
                <Field name="micros">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập micros" />
                  )}
                </Field>
              </FormItem>

              <FormItem label="Click">
                <NumberInput
                  value={values.click}
                  placeholder="Nhập số click..."
                  onChange={(value) => setFieldValue('click', value)}
                />
              </FormItem>

              <FormItem label="CTR">
                <NumberInput
                  value={values.ctr}
                  placeholder="Nhập CTR..."
                  onChange={(value) => setFieldValue('ctr', value)}
                />
              </FormItem>

              <FormItem label="CPM">
                <NumberInput
                  value={values.cpm}
                  placeholder="Nhập CPM..."
                  onChange={(value) => setFieldValue('cpm', value)}
                />
              </FormItem>

              <FormItem label="Ngân sách chi tiêu">
                <Field name="cost">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập chi phí" />
                  )}
                </Field>
              </FormItem>

              <FormItem label="Mục tiêu quốc gia">
                <TagInput
                  value={values.locationTarget || []}
                  placeholder="Nhập quốc gia..."
                  onChange={(tags) => setFieldValue('locationTarget', tags)}
                />
              </FormItem>

              <FormItem label="Quốc gia cắn tiền">
                <NumberInput
                  value={values.spendingCountry}
                  placeholder="Nhập ID quốc gia..."
                  onChange={(value) => setFieldValue('spendingCountry', value)}
                />
              </FormItem>

              <FormItem label="CPC quốc gia">
                <Field name="cpcCountry">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập CPC quốc gia" />
                  )}
                </Field>
              </FormItem>

              <FormItem label="CTR quốc gia">
                <NumberInput
                  value={values.ctrCountry}
                  placeholder="Nhập CTR quốc gia..."
                  onChange={(value) => setFieldValue('ctrCountry', value)}
                />
              </FormItem>

              <FormItem label="Click quốc gia">
                <NumberInput
                  value={values.clickCountry}
                  placeholder="Nhập click quốc gia..."
                  onChange={(value) => setFieldValue('clickCountry', value)}
                />
              </FormItem>

              <FormItem label="Tổng chi tiêu quốc gia">
                <Field name="costCountry">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập tổng chi tiêu" />
                  )}
                </Field>
              </FormItem>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" disabled={isSubmitting} onClick={closeDialog}>
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
