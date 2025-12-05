import { Button, ConfirmDialog, DatePicker, FormContainer, FormItem, Input, Tabs } from '@/components/ui'
import {
  useCreateCampaignMutation,
  useGetCampaignDetailQuery,
  useUpdateCampaignMutation,
} from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { KeywordMatch, LocationStat, SearchTerm, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TagInput from '@/components/shared/TagInput'
import { useState } from 'react'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'

const { TabNav, TabList, TabContent } = Tabs

const validationSchema = Yup.object().shape({
  importAt: Yup.string().nullable(),
  date: Yup.string().required('Vui lòng nhập ngày'),
  uid: Yup.string().required('Vui lòng nhập UID'),
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
      cost: Yup.number().required(),
    }),
  ),
  status: Yup.string(),
  avgCpc: Yup.number().nullable(),
  targetCpc: Yup.number().nullable(),
  click: Yup.number().nullable(),
  ctr: Yup.number().nullable(),
  cpm: Yup.number().nullable(),
  budget: Yup.number().nullable(),
  targetLocations: Yup.array().of(Yup.string()),
  locationStats: Yup.array().of(
    Yup.object().shape({
      location: Yup.string().required(),
      clicks: Yup.number().required(),
      ctr: Yup.number().required(),
      cpc: Yup.number().required(),
      cost: Yup.number().required(),
    }),
  ),
})

export default function CampaignForm() {
  const { campaignId, dialogOpen, closeDialog } = useCampaignStore()
  const [activeTab, setActiveTab] = useState('basic')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const isEdit = !!campaignId

  const { data: campaign } = useGetCampaignDetailQuery(campaignId!, dialogOpen)
  const createMutation = useCreateCampaignMutation()
  const updateMutation = useUpdateCampaignMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận thay đổi chiến dịch',
    type: 'info',
    cancelText: 'Hủy',
  })

  const initialValues: UpdateCampaignRequest = {
    importAt: campaign?.importAt || null,
    date: campaign?.date || null,
    uid: campaign?.uid || null,
    mcc: campaign?.mcc || null,
    name: campaign?.name || null,
    externalId: campaign?.externalId || null,
    finalUrl: campaign?.finalUrlImport || null,
    keywords: campaign?.keywords || [],
    topSearchTerms: campaign?.topSearchTerms || [],
    status: campaign?.status || '',
    avgCpc: campaign?.avgCpc || null,
    targetCpc: campaign?.targetCpc || null,
    clicks: campaign?.clicks || null,
    ctr: campaign?.ctr || null,
    cpm: campaign?.cpm || null,
    cost: campaign?.cost || null,
    impression: campaign?.impression || null,
    targetLocations: campaign?.targetLocations || [],
    locationStats: campaign?.locationStats || [],
    campaignBudget: campaign?.campaignBudget || null,
    locationExcluded: campaign?.locationExcluded || [],
    negativeKeywords: campaign?.negativeKeywords || [],
  }

  const handleSubmit = async (values: UpdateCampaignRequest) => {
    if (isEdit) {
      const confirmed = await showConfirm({
        message: 'Bạn có chắc chắn muốn cập nhật chiến dịch này không?',
      })

      if (confirmed) {
        await updateMutation.mutateAsync({
          campaignId,
          payload: values,
        })
      }
    } else {
      await createMutation.mutateAsync(values)
    }

    closeDialog()
  }

  return (
    <>
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
                  <TabNav value="negativeKeywords">Từ khóa loại trừ</TabNav>
                  <TabNav value="searchTerms">Thuật ngữ tìm kiếm</TabNav>
                  <TabNav value="locations">Thống kê quốc gia</TabNav>
                </TabList>

                <TabContent value="basic">
                  <div className="gap-4 grid grid-cols-4 mt-4">
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

                    <FormItem asterisk label="UID" invalid={errors.uid && touched.uid} errorMessage={errors.uid}>
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
                        onChange={(date) => setFieldValue('importAt', date)}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Ngày dữ liệu"
                      invalid={errors.date && touched.date}
                      errorMessage={errors.date}
                    >
                      <DatePicker
                        value={values.date ? new Date(values.date) : null}
                        placeholder="dd/mm/yyyy"
                        inputFormat="DD/MM/YYYY"
                        onChange={(date) => setFieldValue('date', date)}
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
                      <Field
                        name="avgCpc"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('avgCpc', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Thầu chung">
                      <Field
                        name="targetCpc"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('targetCpc', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Click">
                      <Field
                        name="clicks"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('clicks', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="CTR">
                      <Field
                        name="ctr"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('ctr', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="CPM">
                      <Field
                        name="cpm"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('cpm', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Lượt hiển thị">
                      <Field
                        name="impression"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('impression', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Ngân sách chi tiêu">
                      <Field
                        name="cost"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('cost', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Ngân sách chiến dịch">
                      <Field
                        name="campaignBudget"
                        type="number"
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('campaignBudget', Number(e.target.value))
                        }
                      />
                    </FormItem>

                    <FormItem label="Quốc gia mục tiêu" className="col-span-2">
                      <TagInput
                        value={values.targetLocations || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('targetLocations', tags)}
                      />
                    </FormItem>

                    <FormItem label="Quốc gia loại trừ" className="col-span-2">
                      <TagInput
                        value={values.locationExcluded || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('locationExcluded', tags)}
                      />
                    </FormItem>
                  </div>
                </TabContent>

                <TabContent value="keywords">
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold">Danh sách từ khóa</h6>
                      <Button
                        type="button"
                        size="sm"
                        icon={<PlusIcon />}
                        onClick={() => {
                          const newKeyword: KeywordMatch = {
                            keyword: '',
                            match: '',
                            clicks: null,
                            ctr: null,
                            cpc: null,
                            cpm: null,
                            cost: null,
                            impression: null,
                            bid: null,
                          }
                          setFieldValue('keywords', [...values.keywords, newKeyword])
                        }}
                      >
                        Thêm từ khóa
                      </Button>
                    </div>

                    {values.keywords.length === 0 ? (
                      <div className="py-8 text-gray-500 text-center">Chưa có từ khóa nào</div>
                    ) : (
                      <div className="space-y-6 divide-y">
                        {values.keywords.map((keyword, index) => (
                          <div key={index} className="flex items-start gap-3 pt-3">
                            <div className="flex-1 gap-3 grid grid-cols-6">
                              <FormItem label="Từ khóa">
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

                              <FormItem label="Hình thức">
                                <Input
                                  value={keyword.match}
                                  placeholder="Exact, Phrase,..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].match = e.target.value
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPC thầu chung">
                                <Input
                                  type="number"
                                  value={keyword.bid || ''}
                                  placeholder="CPC thầu chung..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].bid = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Click">
                                <Input
                                  type="number"
                                  value={keyword.clicks || ''}
                                  placeholder="Click..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].clicks = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Lượt hiển thị">
                                <Input
                                  type="number"
                                  value={keyword.impression || ''}
                                  placeholder="Lượt hiển thị..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].impression = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CTR">
                                <Input
                                  type="number"
                                  value={keyword.ctr || ''}
                                  placeholder="CTR..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].ctr = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPC">
                                <Input
                                  type="number"
                                  value={keyword.cpc || ''}
                                  placeholder="CPC..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].cpc = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPM">
                                <Input
                                  type="number"
                                  value={keyword.cpm || ''}
                                  placeholder="CPM..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].cpm = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Chi phí">
                                <Input
                                  type="number"
                                  value={keyword.cost || ''}
                                  placeholder="Chi phí..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.keywords]
                                    updatedKeywords[index].cost = Number(e.target.value)
                                    setFieldValue('keywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="mt-8">
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

                <TabContent value="negativeKeywords">
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold">Danh sách từ khóa loại trừ</h6>
                      <Button
                        type="button"
                        size="sm"
                        icon={<PlusIcon />}
                        onClick={() => {
                          const newKeyword: KeywordMatch = {
                            keyword: '',
                            match: '',
                            clicks: 0,
                            ctr: 0,
                            cpc: 0,
                            cpm: 0,
                            cost: 0,
                            impression: 0,
                            bid: 0,
                          }
                          setFieldValue('negativeKeywords', [...values.negativeKeywords, newKeyword])
                        }}
                      >
                        Thêm từ khóa
                      </Button>
                    </div>

                    {values.negativeKeywords.length === 0 ? (
                      <div className="py-8 text-gray-500 text-center">Chưa có từ khóa loại trừ nào</div>
                    ) : (
                      <div className="space-y-6 divide-y">
                        {values.negativeKeywords.map((keyword, index) => (
                          <div key={index} className="flex items-start gap-3 pt-3">
                            <div className="flex-1 gap-3 grid grid-cols-2">
                              <FormItem label="Từ khóa">
                                <Input
                                  value={keyword.keyword}
                                  placeholder="Nhập từ khóa..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.negativeKeywords]
                                    updatedKeywords[index].keyword = e.target.value
                                    setFieldValue('negativeKeywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>
                              <FormItem label="Hình thức">
                                <Input
                                  value={keyword.match}
                                  placeholder="Exact, Phrase,..."
                                  onChange={(e) => {
                                    const updatedKeywords = [...values.negativeKeywords]
                                    updatedKeywords[index].match = e.target.value
                                    setFieldValue('negativeKeywords', updatedKeywords)
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="mt-8">
                              <Button
                                type="button"
                                size="sm"
                                variant="plain"
                                icon={<TrashIcon />}
                                onClick={() => {
                                  const updatedKeywords = values.negativeKeywords.filter((_, i) => i !== index)
                                  setFieldValue('negativeKeywords', updatedKeywords)
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
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={sortOrder === 'asc' ? 'solid' : 'twoTone'}
                          icon={<ArrowUpIcon />}
                          onClick={() => {
                            const sorted = [...values.topSearchTerms].sort((a, b) => (a.cost || 0) - (b.cost || 0))
                            setFieldValue('topSearchTerms', sorted)
                            setSortOrder('asc')
                          }}
                        >
                          Tăng dần
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          variant={sortOrder === 'desc' ? 'solid' : 'twoTone'}
                          icon={<ArrowDownIcon />}
                          onClick={() => {
                            const sorted = [...values.topSearchTerms].sort((a, b) => (b.cost || 0) - (a.cost || 0))
                            setFieldValue('topSearchTerms', sorted)
                            setSortOrder('desc')
                          }}
                        >
                          Giảm dần
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          icon={<PlusIcon />}
                          onClick={() => {
                            const newTerm: SearchTerm = {
                              term: '',
                              cpc: 0,
                              cost: 0,
                              clicks: 0,
                              ctr: 0,
                              cpm: 0,
                              impression: 0,
                            }
                            setFieldValue('topSearchTerms', [...values.topSearchTerms, newTerm])
                          }}
                        >
                          Thêm thuật ngữ
                        </Button>
                      </div>
                    </div>

                    {values.topSearchTerms.length === 0 ? (
                      <div className="py-8 text-gray-500 text-center">Chưa có thuật ngữ tìm kiếm nào</div>
                    ) : (
                      <div className="space-y-6 divide-y">
                        {values.topSearchTerms.map((term, index) => (
                          <div key={index} className="flex items-start gap-3 pt-3">
                            <div className="flex-1 gap-3 grid grid-cols-7">
                              <FormItem label="Thuật ngữ">
                                <Input
                                  value={term.term}
                                  placeholder="Thuật ngữ..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].term = e.target.value
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Click">
                                <Input
                                  type="number"
                                  value={term.clicks || ''}
                                  placeholder="Click..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].clicks = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CTR">
                                <Input
                                  type="number"
                                  value={term.ctr || ''}
                                  placeholder="CTR..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].ctr = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPC">
                                <Input
                                  type="number"
                                  value={term.cpc || ''}
                                  placeholder="CPC..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].cpc = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPM">
                                <Input
                                  type="number"
                                  value={term.cpm || ''}
                                  placeholder="CPM..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].cpm = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Lượt hiển thị">
                                <Input
                                  type="number"
                                  value={term.impression || ''}
                                  placeholder="Lượt hiển thị..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].impression = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Đã tiêu">
                                <Input
                                  type="number"
                                  value={term.cost || ''}
                                  placeholder="Đã tiêu..."
                                  onChange={(e) => {
                                    const updatedTerms = [...values.topSearchTerms]
                                    updatedTerms[index].cost = parseFloat(e.target.value) || 0
                                    setFieldValue('topSearchTerms', updatedTerms)
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="mt-8">
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
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={sortOrder === 'asc' ? 'solid' : 'twoTone'}
                          icon={<ArrowUpIcon />}
                          onClick={() => {
                            const sorted = [...values.locationStats].sort((a, b) => (a.cost || 0) - (b.cost || 0))
                            setFieldValue('locationStats', sorted)
                            setSortOrder('asc')
                          }}
                        >
                          Tăng dần
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          variant={sortOrder === 'desc' ? 'solid' : 'twoTone'}
                          icon={<ArrowDownIcon />}
                          onClick={() => {
                            const sorted = [...values.locationStats].sort((a, b) => (b.cost || 0) - (a.cost || 0))
                            setFieldValue('locationStats', sorted)
                            setSortOrder('desc')
                          }}
                        >
                          Giảm dần
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          icon={<PlusIcon />}
                          onClick={() => {
                            const newLocation: LocationStat = {
                              location: '',
                              clicks: 0,
                              ctr: 0,
                              cpc: 0,
                              cpm: 0,
                              cost: 0,
                              impression: 0,
                            }
                            setFieldValue('locationStats', [...values.locationStats, newLocation])
                          }}
                        >
                          Thêm quốc gia
                        </Button>
                      </div>
                    </div>

                    {values.locationStats.length === 0 ? (
                      <div className="py-8 text-gray-500 text-center">Chưa có thống kê quốc gia nào</div>
                    ) : (
                      <div className="space-y-6 divide-y">
                        {values.locationStats.map((location, index) => (
                          <div key={index} className="flex items-start gap-3 pt-3">
                            <div className="flex-1 gap-3 grid grid-cols-7">
                              <FormItem label="Quốc gia">
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

                              <FormItem label="Click">
                                <Input
                                  type="number"
                                  value={location.clicks || ''}
                                  placeholder="Click..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].clicks = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CTR">
                                <Input
                                  type="number"
                                  value={location.ctr || ''}
                                  placeholder="CTR..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].ctr = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPC">
                                <Input
                                  type="number"
                                  value={location.cpc || ''}
                                  placeholder="CPC..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].cpc = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="CPM">
                                <Input
                                  type="number"
                                  value={location.cpm || ''}
                                  placeholder="CPM..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].cpm = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Lượt hiển thị">
                                <Input
                                  type="number"
                                  value={location.impression || ''}
                                  placeholder="Lượt hiển thị..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].impression = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>

                              <FormItem label="Đã tiêu">
                                <Input
                                  type="number"
                                  value={location.cost || ''}
                                  placeholder="Đã tiêu..."
                                  onChange={(e) => {
                                    const updatedLocations = [...values.locationStats]
                                    updatedLocations[index].cost = parseFloat(e.target.value) || 0
                                    setFieldValue('locationStats', updatedLocations)
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="mt-8">
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

      <ConfirmDialog {...confirmProps} loading={updateMutation.isPending} />
    </>
  )
}
