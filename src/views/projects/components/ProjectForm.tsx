import { Button, DatePicker, FormContainer, FormItem, Input, Select, Tabs, Textarea } from '@/components/ui'
import { Field, FieldProps, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import {
  useCreateProjectMutation,
  useGetProjectDetailQuery,
  useUpdateProjectMutation,
} from '@/views/projects/hooks/useProject'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import TagInput from '@/components/shared/TagInput'
import NumberInput from '@/components/shared/NumberInput'
import { SelectOption } from '@/@types/common'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectTypeList } from '@/services/ProjectTypeService'
import { apiGetProjectStatusList } from '@/views/masterData/projectStatus/services/ProjectStatusService'
import { useCreateProjectTypeMutation } from '@/views/masterData/projectType/hooks/useProjectType'
import { useCreateProjectStatusMutation } from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { useState } from 'react'

const { TabNav, TabList, TabContent } = Tabs

const finalUrlValidationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên'),
  finalURL: Yup.string().required('Vui lòng nhập URL'),
  countries: Yup.array().of(Yup.string()).min(1, 'Vui lòng chọn ít nhất 1 quốc gia'),
})

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên dự án là bắt buộc'),
  typeId: Yup.string().required('Loại dự án là bắt buộc'),
  statusId: Yup.string().required('Trạng thái là bắt buộc'),
  totalBudget: Yup.number().min(0, 'Tổng ngân sách phải lớn hơn hoặc bằng 0'),
  exclusiveKeywords: Yup.array().of(Yup.string()),
  rejectedKeywords: Yup.array().of(Yup.string()),
  targetCountries: Yup.array().of(Yup.string()),
  rejectedCountries: Yup.array().of(Yup.string()),
  devices: Yup.array().of(Yup.string()),
  age: Yup.number().nullable(),
  gender: Yup.string(),
  title: Yup.string(),
  description: Yup.string(),
  note: Yup.string(),
  content: Yup.string(),
  domainStatus: Yup.string(),
  originalDomain: Yup.string(),
  originalLadipage: Yup.string(),
  finalURL: Yup.string(),
  trackingURL: Yup.string(),
  deadline: Yup.date().nullable(),
  startedAt: Yup.date().nullable(),
  finalUrls: Yup.array().of(finalUrlValidationSchema),
})

const gendersOptions: SelectOption[] = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'both', label: 'Nam và Nữ' },
]

export default function ProjectForm() {
  const { projectId, dialogOpen, closeDialog } = useProjectStore()
  const isEdit = !!projectId
  const [currentTab, setCurrentTab] = useState('info')

  const { data: project } = useGetProjectDetailQuery(projectId!, dialogOpen)

  const createMutation = useCreateProjectMutation()
  const updateMutation = useUpdateProjectMutation()
  const createProjectTypeMutation = useCreateProjectTypeMutation()
  const createProjectStatusMutation = useCreateProjectStatusMutation()

  const fetchProjectTypes = async ({ page, limit, search }: SelectParams) => {
    const response = await apiGetProjectTypeList({ page, limit, search: search || '' })
    const { items, meta } = response.data.data
    return {
      data: items,
      total: meta.total,
      hasMore: meta.hasNext,
    }
  }

  const fetchProjectStatuses = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetProjectStatusList({ page, limit, search: search || '' })
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

  const initialValues = {
    name: project?.name || '',
    typeId: project?.typeId || '',
    statusId: project?.statusId || '',
    totalBudget: project?.totalBudget || 0,
    exclusiveKeywords: project?.exclusiveKeywords || [],
    rejectedKeywords: project?.rejectedKeywords || [],
    targetCountries: project?.targetCountries || [],
    rejectedCountries: project?.rejectedCountries || [],
    devices: project?.devices || [],
    age: project?.age || null,
    gender: project?.gender || '',
    title: project?.title || '',
    description: project?.description || '',
    note: project?.note || '',
    content: project?.content || '',
    domainStatus: project?.domainStatus || '',
    originalDomain: project?.originalDomain || '',
    originalLadipage: project?.originalLadipage || '',
    finalURL: project?.finalURL || '',
    trackingURL: project?.trackingURL || '',
    deadline: project?.deadline ? new Date(project.deadline) : null,
    startedAt: project?.startedAt ? new Date(project.startedAt) : null,
    finalUrls: [
      {
        name: '',
        finalURL: '',
        countries: [],
      },
    ],
  }

  const handleSubmit = async (values: any) => {
    const projectData = { ...values }
    delete projectData.finalUrls // Tạm thời xóa finalUrls khỏi payload vì backend chưa hỗ trợ

    if (isEdit) {
      await updateMutation.mutateAsync({
        projectId: projectId!,
        payload: projectData,
      })
    } else {
      await createMutation.mutateAsync(projectData)
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
            <Tabs value={currentTab} onChange={(val) => setCurrentTab(val)}>
              <TabList>
                <TabNav value="info">Thông tin dự án</TabNav>
                <TabNav value="finalUrls">Danh sách URL cuối cùng</TabNav>
              </TabList>
              <div className="mt-4">
                <TabContent value="info">
                  <div className="gap-4 grid grid-cols-3">
                    <FormItem
                      asterisk
                      label="Tên dự án"
                      invalid={errors.name && touched.name}
                      errorMessage={errors.name}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Nhập tên dự án..."
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Loại dự án"
                      invalid={errors.typeId && touched.typeId}
                      errorMessage={errors.typeId}
                    >
                      <Field name="typeId">
                        {({ field, form }: FieldProps) => (
                          <SelectCustom
                            isCreatable
                            field={field}
                            form={form}
                            fetchOptions={fetchProjectTypes}
                            onCreateOption={async (inputValue: string) => {
                              await createProjectTypeMutation.mutateAsync({ name: inputValue })
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      asterisk
                      label="Trạng thái"
                      invalid={errors.statusId && touched.statusId}
                      errorMessage={errors.statusId as string}
                    >
                      <Field name="statusId">
                        {({ field, form }: FieldProps) => (
                          <SelectCustom
                            isCreatable
                            field={field}
                            form={form}
                            fetchOptions={fetchProjectStatuses}
                            onCreateOption={async (inputValue: string) => {
                              await createProjectStatusMutation.mutateAsync({ name: inputValue })
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem label="Tổng ngân sách">
                      <Field name="totalBudget">
                        {({ field, form }: FieldProps) => (
                          <FormCurrencyInput form={form} field={field} placeholder="Nhập tổng ngân sách" />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem label="Tiêu đề">
                      <Field
                        type="text"
                        name="title"
                        placeholder="Nhập tiêu đề..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('title', e.target.value)}
                      />
                    </FormItem>

                    <FormItem label="Deadline">
                      <DatePicker
                        value={values.deadline}
                        placeholder="dd/mm/yyyy"
                        inputFormat="DD/MM/YYYY"
                        onChange={(date) => setFieldValue('deadline', date)}
                      />
                    </FormItem>

                    <FormItem label="Mô tả">
                      <Field
                        name="description"
                        placeholder="Nhập mô tả dự án..."
                        component={Textarea}
                        rows={3}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFieldValue('description', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="Ghi chú">
                      <Field
                        name="note"
                        placeholder="Nhập ghi chú..."
                        component={Textarea}
                        rows={2}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('note', e.target.value)}
                      />
                    </FormItem>

                    <FormItem label="Nội dung">
                      <Field
                        name="content"
                        placeholder="Nhập nội dung..."
                        component={Textarea}
                        rows={3}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFieldValue('content', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="Ngày bắt đầu">
                      <DatePicker
                        value={values.startedAt}
                        placeholder="dd/mm/yyyy"
                        inputFormat="DD/MM/YYYY"
                        onChange={(date) => setFieldValue('startedAt', date)}
                      />
                    </FormItem>

                    <FormItem label="Tình trạng domain">
                      <Field
                        name="domainStatus"
                        placeholder="Nhập tình trạng domain..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('domainStatus', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="Domain gốc">
                      <Field
                        name="originalDomain"
                        placeholder="Nhập domain gốc..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('originalDomain', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="Ladipage">
                      <Field
                        name="originalLadipage"
                        placeholder="Nhập link ladipage..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('originalLadipage', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="URL cuối cùng">
                      <Field
                        name="finalURL"
                        placeholder="Nhập URL cuối cùng..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('finalURL', e.target.value)}
                      />
                    </FormItem>

                    <FormItem label="URL theo dõi">
                      <Field
                        name="trackingURL"
                        placeholder="Nhập URL theo dõi..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('trackingURL', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="Từ khóa độc quyền">
                      <TagInput
                        value={values.exclusiveKeywords || []}
                        placeholder="Nhập từ khóa..."
                        onChange={(tags) => setFieldValue('exclusiveKeywords', tags)}
                      />
                    </FormItem>

                    <FormItem label="Từ khóa bị hạn chế">
                      <TagInput
                        value={values.rejectedKeywords || []}
                        placeholder="Nhập từ khóa..."
                        onChange={(tags) => setFieldValue('rejectedKeywords', tags)}
                      />
                    </FormItem>

                    <FormItem label="Thiết bị">
                      <TagInput
                        value={values.devices || []}
                        placeholder="Nhập thiết bị..."
                        onChange={(tags) => setFieldValue('devices', tags)}
                      />
                    </FormItem>

                    <FormItem label="Quốc gia">
                      <TagInput
                        value={values.targetCountries || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('targetCountries', tags)}
                      />
                    </FormItem>

                    <FormItem label="Quốc gia bị hạn chế">
                      <TagInput
                        value={values.rejectedCountries || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('rejectedCountries', tags)}
                      />
                    </FormItem>

                    <FormItem label="Giới tính">
                      <Select
                        options={gendersOptions}
                        value={gendersOptions.find((opt) => opt.value === values.gender)}
                        placeholder="Chọn giới tính..."
                        onChange={(option: SelectOption | null) => setFieldValue('gender', option?.value)}
                      />
                    </FormItem>

                    <FormItem label="Độ tuổi">
                      <NumberInput
                        value={values.age}
                        min={1}
                        max={100}
                        placeholder="Nhập độ tuổi"
                        onChange={(value) => setFieldValue('age', value)}
                      />
                    </FormItem>
                  </div>
                </TabContent>

                <TabContent value="finalUrls">
                  <FieldArray name="finalUrls">
                    {({ push, remove }) => (
                      <div className="space-y-6">
                        {values.finalUrls?.map((_finalUrl: any, index: number) => (
                          <div key={index} className="relative p-4 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h6 className="font-semibold">URL {index + 1}</h6>
                              {values.finalUrls && values.finalUrls.length > 1 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="plain"
                                  icon={<HiOutlineTrash />}
                                  onClick={() => remove(index)}
                                >
                                  Xóa
                                </Button>
                              )}
                            </div>

                            <div className="gap-4 grid grid-cols-2">
                              <FormItem
                                asterisk
                                label="Tên"
                                invalid={
                                  touched.finalUrls?.[index]?.name && Boolean((errors.finalUrls as any)?.[index]?.name)
                                }
                                errorMessage={(errors.finalUrls as any)?.[index]?.name}
                              >
                                <Field
                                  type="text"
                                  autoComplete="off"
                                  name={`finalUrls.${index}.name`}
                                  placeholder="Nhập tên..."
                                  component={Input}
                                />
                              </FormItem>

                              <FormItem
                                asterisk
                                label="URL"
                                invalid={
                                  touched.finalUrls?.[index]?.finalURL &&
                                  Boolean((errors.finalUrls as any)?.[index]?.finalURL)
                                }
                                errorMessage={(errors.finalUrls as any)?.[index]?.finalURL}
                              >
                                <Field
                                  type="text"
                                  autoComplete="off"
                                  name={`finalUrls.${index}.finalURL`}
                                  placeholder="Nhập URL..."
                                  component={Input}
                                />
                              </FormItem>

                              <FormItem
                                asterisk
                                className="col-span-2"
                                label="Quốc gia"
                                invalid={
                                  touched.finalUrls?.[index]?.countries &&
                                  Boolean((errors.finalUrls as any)?.[index]?.countries)
                                }
                                errorMessage={(errors.finalUrls as any)?.[index]?.countries}
                              >
                                <TagInput
                                  value={values.finalUrls?.[index]?.countries || []}
                                  placeholder="Nhập quốc gia..."
                                  onChange={(tags) => setFieldValue(`finalUrls.${index}.countries`, tags)}
                                />
                              </FormItem>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="solid"
                          size="sm"
                          icon={<HiOutlinePlus />}
                          onClick={() =>
                            push({
                              name: '',
                              finalURL: '',
                              countries: [],
                            })
                          }
                        >
                          Thêm URL
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </TabContent>
              </div>
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
