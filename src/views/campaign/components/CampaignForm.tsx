import { Button, DatePicker, FormContainer, FormItem, Input, Tabs } from '@/components/ui'
import {
  useCreateCampaignMutation,
  useGetCampaignDetailQuery,
  useUpdateCampaignMutation,
} from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { KeywordMatch, LocationStat, SearchTerm, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TagInput from '@/components/shared/TagInput'
import NumberInput from '@/components/shared/NumberInput'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'

const { TabNav, TabList, TabContent } = Tabs

const validationSchema = Yup.object().shape({
  importAt: Yup.string().nullable(),
  date: Yup.string().nullable(),
  uid: Yup.string().nullable(),
  mcc: Yup.string().nullable(),
  name: Yup.string().required('Vui lòng nhập tên chiến dịch'),
  externalId: Yup.string().required('Vui lòng nhập ID chiến dịch'),
  finalUrl: Yup.string().url('URL không hợp lệ').nullable(),
  keywords: Yup.array().of(
    Yup.object().shape({
      keyword: Yup.string().required(),
      match: Yup.string().required(),
    }),
  ),
  topSearchTerms: Yup.array().of(
    Yup.object().shape({
      term: Yup.string().required(),
      cpc: Yup.number().required(),
      spent: Yup.number().required(),
    }),
  ),
  status: Yup.string(),
  avgCpc: Yup.number().nullable(),
  micros: Yup.number().nullable(),
  click: Yup.number().nullable(),
  ctr: Yup.number().nullable(),
  cpm: Yup.number().nullable(),
  cost: Yup.number().nullable(),
  targetLocations: Yup.array().of(Yup.string()),
  locationStats: Yup.array().of(
    Yup.object().shape({
      location: Yup.string().required(),
      clicks: Yup.number().required(),
      ctr: Yup.number().required(),
      cpc: Yup.number().required(),
      spent: Yup.number().required(),
    }),
  ),
})

export default function CampaignForm() {
  const { campaignId, dialogOpen, closeDialog } = useCampaignStore()
  const [activeTab, setActiveTab] = useState('basic')

  const isEdit = !!campaignId

  const { data: campaign } = useGetCampaignDetailQuery(campaignId!, dialogOpen)
  const createMutation = useCreateCampaignMutation()
  const updateMutation = useUpdateCampaignMutation()

  const initialValues: UpdateCampaignRequest = {
    importAt: campaign?.importAt || null,
    date: campaign?.date || null,
    uid: campaign?.uid || null,
    mcc: campaign?.mcc || null,
    name: campaign?.name || null,
    externalId: campaign?.externalId || null,
    finalUrl: campaign?.finalUrl?.finalURL || null,
    keywords: campaign?.keywords || [],
    topSearchTerms: campaign?.topSearchTerms || [],
    status: campaign?.status || '',
    avgCpc: campaign?.avgCpc || null,
    micros: campaign?.micros || null,
    click: campaign?.click || null,
    ctr: campaign?.ctr || null,
    cpm: campaign?.cpm || null,
    cost: campaign?.cost || null,
    targetLocations: campaign?.targetLocations || [],
    locationStats: campaign?.locationStats || [],
  }

  const handleSubmit = async (values: UpdateCampaignRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        campaignId: campaignId!,
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
            <Tabs value={activeTab} onChange={setActiveTab}>
              <TabList>
                <TabNav value="basic">Thông tin cơ bản</TabNav>
                <TabNav value="keywords">Từ khóa</TabNav>
                <TabNav value="searchTerms">Thuật ngữ tìm kiếm</TabNav>
                <TabNav value="locations">Thống kê quốc gia</TabNav>
              </TabList>

              <TabContent value="basic">
                <div className="gap-4 grid grid-cols-3 mt-4">
                  <FormItem
                    asterisk
                    label="ID chiến dịch"
                    invalid={errors.externalId && touched.externalId}
                    errorMessage={errors.externalId}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="externalId"
                      placeholder="Nhập ID chiến dịch..."
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Tên chiến dịch"
                    invalid={errors.name && touched.name}
                    errorMessage={errors.name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="name"
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

                  <FormItem label="Thời gian nhập">
                    <DatePicker
                      value={values.importAt ? new Date(values.importAt) : null}
                      placeholder="dd/mm/yyyy"
                      inputFormat="DD/MM/YYYY"
                      onChange={(date) => setFieldValue('importAt', date ? date.toISOString().split('T')[0] : null)}
                    />
                  </FormItem>

                  <FormItem label="Ngày">
                    <DatePicker
                      value={values.date ? new Date(values.date) : null}
                      placeholder="dd/mm/yyyy"
                      inputFormat="DD/MM/YYYY"
                      onChange={(date) => setFieldValue('date', date ? date.toISOString().split('T')[0] : null)}
                    />
                  </FormItem>

                  <FormItem label="Trạng thái chiến dịch">
                    <Field
                      type="text"
                      name="status"
                      placeholder="Nhập trạng thái..."
                      component={Input}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('status', e.target.value)}
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

                  <FormItem label="Quốc gia mục tiêu" className="col-span-3">
                    <TagInput
                      value={values.targetLocations || []}
                      placeholder="Nhập quốc gia..."
                      onChange={(tags) => setFieldValue('targetLocations', tags)}
                    />
                  </FormItem>
                </div>
              </TabContent>

              <TabContent value="keywords">
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="font-semibold">Danh sách từ khóa</h6>
                    <Button
                      type="button"
                      size="sm"
                      icon={<PlusIcon />}
                      onClick={() => {
                        const newKeyword: KeywordMatch = { keyword: '', match: '' }
                        setFieldValue('keywords', [...values.keywords, newKeyword])
                      }}
                    >
                      Thêm từ khóa
                    </Button>
                  </div>

                  {values.keywords.length === 0 ? (
                    <div className="py-8 text-gray-500 text-center">Chưa có từ khóa nào</div>
                  ) : (
                    <div className="space-y-3">
                      {values.keywords.map((keyword, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-1 gap-3 grid grid-cols-2">
                            <FormItem label={index === 0 ? 'Từ khóa' : ''}>
                              <Input
                                value={keyword.keyword}
                                placeholder="Nhập từ khóa..."
                                onChange={(e) => {
                                  const updatedKeywords = [...values.keywords]
                                  updatedKeywords[index].keyword = e.target.value
                                  setFieldValue('keywords', updatedKeywords)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'Match Type' : ''}>
                              <Input
                                value={keyword.match}
                                placeholder="exact, phrase, broad..."
                                onChange={(e) => {
                                  const updatedKeywords = [...values.keywords]
                                  updatedKeywords[index].match = e.target.value
                                  setFieldValue('keywords', updatedKeywords)
                                }}
                              />
                            </FormItem>
                          </div>
                          <div className={index === 0 ? 'mt-8' : ''}>
                            <Button
                              type="button"
                              size="sm"
                              variant="plain"
                              icon={<TrashIcon />}
                              onClick={() => {
                                const updatedKeywords = values.keywords.filter((_, i) => i !== index)
                                setFieldValue('keywords', updatedKeywords)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabContent>

              <TabContent value="searchTerms">
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="font-semibold">Danh sách thuật ngữ tìm kiếm</h6>
                    <Button
                      type="button"
                      size="sm"
                      icon={<PlusIcon />}
                      onClick={() => {
                        const newTerm: SearchTerm = { term: '', cpc: 0, spent: 0 }
                        setFieldValue('topSearchTerms', [...values.topSearchTerms, newTerm])
                      }}
                    >
                      Thêm thuật ngữ
                    </Button>
                  </div>

                  {values.topSearchTerms.length === 0 ? (
                    <div className="py-8 text-gray-500 text-center">Chưa có thuật ngữ tìm kiếm nào</div>
                  ) : (
                    <div className="space-y-3">
                      {values.topSearchTerms.map((term, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-1 gap-3 grid grid-cols-3">
                            <FormItem label={index === 0 ? 'Thuật ngữ' : ''}>
                              <Input
                                value={term.term}
                                placeholder="Nhập thuật ngữ..."
                                onChange={(e) => {
                                  const updatedTerms = [...values.topSearchTerms]
                                  updatedTerms[index].term = e.target.value
                                  setFieldValue('topSearchTerms', updatedTerms)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'CPC' : ''}>
                              <NumberInput
                                value={term.cpc}
                                placeholder="Nhập CPC..."
                                onChange={(value) => {
                                  const updatedTerms = [...values.topSearchTerms]
                                  updatedTerms[index].cpc = value || 0
                                  setFieldValue('topSearchTerms', updatedTerms)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'Spent' : ''}>
                              <NumberInput
                                value={term.spent}
                                placeholder="Nhập spent..."
                                onChange={(value) => {
                                  const updatedTerms = [...values.topSearchTerms]
                                  updatedTerms[index].spent = value || 0
                                  setFieldValue('topSearchTerms', updatedTerms)
                                }}
                              />
                            </FormItem>
                          </div>
                          <div className={index === 0 ? 'mt-8' : ''}>
                            <Button
                              type="button"
                              size="sm"
                              variant="plain"
                              icon={<TrashIcon />}
                              onClick={() => {
                                const updatedTerms = values.topSearchTerms.filter((_, i) => i !== index)
                                setFieldValue('topSearchTerms', updatedTerms)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabContent>

              <TabContent value="locations">
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="font-semibold">Thống kê theo quốc gia</h6>
                    <Button
                      type="button"
                      size="sm"
                      icon={<PlusIcon />}
                      onClick={() => {
                        const newLocation: LocationStat = { location: '', clicks: 0, ctr: 0, cpc: 0, spent: 0 }
                        setFieldValue('locationStats', [...values.locationStats, newLocation])
                      }}
                    >
                      Thêm quốc gia
                    </Button>
                  </div>

                  {values.locationStats.length === 0 ? (
                    <div className="py-8 text-gray-500 text-center">Chưa có thống kê quốc gia nào</div>
                  ) : (
                    <div className="space-y-3">
                      {values.locationStats.map((location, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-1 gap-3 grid grid-cols-5">
                            <FormItem label={index === 0 ? 'Quốc gia' : ''}>
                              <Input
                                value={location.location}
                                placeholder="US, UK..."
                                onChange={(e) => {
                                  const updatedLocations = [...values.locationStats]
                                  updatedLocations[index].location = e.target.value
                                  setFieldValue('locationStats', updatedLocations)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'Clicks' : ''}>
                              <NumberInput
                                value={location.clicks}
                                placeholder="Clicks..."
                                onChange={(value) => {
                                  const updatedLocations = [...values.locationStats]
                                  updatedLocations[index].clicks = value || 0
                                  setFieldValue('locationStats', updatedLocations)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'CTR' : ''}>
                              <NumberInput
                                value={location.ctr}
                                placeholder="CTR..."
                                onChange={(value) => {
                                  const updatedLocations = [...values.locationStats]
                                  updatedLocations[index].ctr = value || 0
                                  setFieldValue('locationStats', updatedLocations)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'CPC' : ''}>
                              <NumberInput
                                value={location.cpc}
                                placeholder="CPC..."
                                onChange={(value) => {
                                  const updatedLocations = [...values.locationStats]
                                  updatedLocations[index].cpc = value || 0
                                  setFieldValue('locationStats', updatedLocations)
                                }}
                              />
                            </FormItem>
                            <FormItem label={index === 0 ? 'Spent' : ''}>
                              <NumberInput
                                value={location.spent}
                                placeholder="Spent..."
                                onChange={(value) => {
                                  const updatedLocations = [...values.locationStats]
                                  updatedLocations[index].spent = value || 0
                                  setFieldValue('locationStats', updatedLocations)
                                }}
                              />
                            </FormItem>
                          </div>
                          <div className={index === 0 ? 'mt-8' : ''}>
                            <Button
                              type="button"
                              size="sm"
                              variant="plain"
                              icon={<TrashIcon />}
                              onClick={() => {
                                const updatedLocations = values.locationStats.filter((_, i) => i !== index)
                                setFieldValue('locationStats', updatedLocations)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabContent>
            </Tabs>

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
