import { Button, DatePicker, FormContainer, FormItem, Input, Tabs, Textarea } from '@/components/ui'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import {
  useCreateProjectMutation,
  useGetProjectDetailQuery,
  useUpdateProjectMutation,
} from '@/views/projects/hooks/useProject'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectTypeList } from '@/services/ProjectTypeService'
import { apiGetProjectStatusList } from '@/views/masterData/projectStatus/services/ProjectStatusService'
import { useCreateProjectTypeMutation } from '@/views/masterData/projectType/hooks/useProjectType'
import { useCreateProjectStatusMutation } from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { useState } from 'react'
import { UpdateProjectRequest } from '@/views/projects/types/project.type'
import ProjectFinalUrlTable from './ProjectFinalUrlTable'
import FinalUrlEditDialog from '@/views/projects/components/FinalUrlEditDialog'
import { SelectOption } from '@/@types/common'
import NumberInput from '@/components/shared/NumberInput'
import TagInput from '@/components/shared/TagInput'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import { setDeadlineTo1800 } from '@/helpers/date'

const { TabNav, TabList, TabContent } = Tabs

const finalUrlValidationSchema = Yup.object().shape({
  name: Yup.string(),
  finalURL: Yup.string(),
  countries: Yup.array().of(Yup.string()),
})

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên dự án là bắt buộc'),
  typeId: Yup.string().required('Loại dự án là bắt buộc'),
  statusId: Yup.string().required('Trạng thái là bắt buộc'),
  cpc: Yup.number().nullable(),
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
  const { projectId, dialogOpen, closeDialog, mode, showFinalUrlTab, setProjectId, setShowFinalUrlTab, setMode } =
    useProjectStore()
  const isEdit = mode === 'EDIT'
  const [currentTab, setCurrentTab] = useState<'info' | 'finalUrls'>('info')

  const { data: project } = useGetProjectDetailQuery(projectId!, dialogOpen)

  const createMutation = useCreateProjectMutation()
  const updateMutation = useUpdateProjectMutation()
  const createProjectTypeMutation = useCreateProjectTypeMutation()
  const createProjectStatusMutation = useCreateProjectStatusMutation()

  const fetchProjectTypes = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetProjectTypeList({ page, limit, search: search || '' })
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

  const initialValues: UpdateProjectRequest = {
    name: project?.name || '',
    typeId: project?.typeId || '',
    statusId: project?.statusId || '',
    cpc: project?.cpc || null,
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
    trackingURL: project?.trackingURL || '',
    deadline: project?.deadline ? new Date(project.deadline) : null,
    startedAt: project?.startedAt ? new Date(project.startedAt) : null,
    finalUrls:
      project?.finalUrls && project.finalUrls.length > 0
        ? project.finalUrls.map((fu) => ({
            id: fu.id,
            name: fu.name || '',
            finalURL: fu.finalURL || '',
            countries: fu.countries || [],
          }))
        : [],
  }

  const handleSubmit = async (values: UpdateProjectRequest) => {
    const projectData = { ...values }

    if (isEdit) {
      await updateMutation.mutateAsync({ projectId: projectId!, payload: projectData })
      closeDialog()
      return
    }

    const response = await createMutation.mutateAsync(projectData)
    const newId = response.data.data.id
    setProjectId(newId)
    setMode('EDIT')
    setShowFinalUrlTab(true)
    setCurrentTab('finalUrls')
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
            <Tabs value={currentTab} onChange={(val) => setCurrentTab(val as 'info' | 'finalUrls')}>
              <TabList>
                <TabNav value="info">Thông tin dự án</TabNav>
                {(isEdit || showFinalUrlTab) && <TabNav value="finalUrls">Danh sách URL</TabNav>}
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
                              const response = await createProjectTypeMutation.mutateAsync({ name: inputValue })
                              return response.data.data.id
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
                              const response = await createProjectStatusMutation.mutateAsync({ name: inputValue })
                              return response.data.data.id
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem label="Tiêu đề" invalid={errors.title && touched.title} errorMessage={errors.title}>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Nhập tiêu đề..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('title', e.target.value)}
                      />
                    </FormItem>

                    <FormItem
                      label="Deadline"
                      invalid={errors.deadline && touched.deadline}
                      errorMessage={errors.deadline}
                    >
                      <DatePicker
                        value={values.deadline}
                        placeholder="dd/mm/yyyy"
                        inputFormat="DD/MM/YYYY"
                        minDate={new Date()}
                        onChange={(date) => setFieldValue('deadline', date)}
                      />
                    </FormItem>

                    <FormItem
                      label="Ngày bắt đầu dự án"
                      invalid={errors.startedAt && touched.startedAt}
                      errorMessage={errors.startedAt}
                    >
                      <DatePicker
                        value={values.startedAt}
                        placeholder="dd/mm/yyyy"
                        inputFormat="DD/MM/YYYY"
                        minDate={new Date()}
                        onChange={(date) => setFieldValue('startedAt', setDeadlineTo1800(date))}
                      />
                    </FormItem>

                    <FormItem
                      label="Mô tả"
                      invalid={errors.description && touched.description}
                      errorMessage={errors.description}
                    >
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

                    <FormItem label="Ghi chú" invalid={errors.note && touched.note} errorMessage={errors.note}>
                      <Field
                        name="note"
                        placeholder="Nhập ghi chú..."
                        component={Textarea}
                        rows={2}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('note', e.target.value)}
                      />
                    </FormItem>

                    <FormItem
                      label="Nội dung"
                      invalid={errors.content && touched.content}
                      errorMessage={errors.content}
                    >
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

                    <FormItem
                      label="Tình trạng domain"
                      invalid={errors.domainStatus && touched.domainStatus}
                      errorMessage={errors.domainStatus}
                    >
                      <Field
                        name="domainStatus"
                        placeholder="Nhập tình trạng domain..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('domainStatus', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem
                      label="Domain gốc"
                      invalid={errors.originalDomain && touched.originalDomain}
                      errorMessage={errors.originalDomain}
                    >
                      <Field
                        name="originalDomain"
                        placeholder="Nhập domain gốc..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('originalDomain', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem
                      label="Ladipage"
                      invalid={errors.originalLadipage && touched.originalLadipage}
                      errorMessage={errors.originalLadipage}
                    >
                      <Field
                        name="originalLadipage"
                        placeholder="Nhập link ladipage..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('originalLadipage', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem
                      label="URL theo dõi"
                      invalid={errors.trackingURL && touched.trackingURL}
                      errorMessage={errors.trackingURL}
                    >
                      <Field
                        type="url"
                        name="trackingURL"
                        placeholder="Nhập URL theo dõi..."
                        component={Input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('trackingURL', e.target.value)
                        }
                      />
                    </FormItem>

                    <FormItem label="CPC" invalid={errors.cpc && touched.cpc} errorMessage={errors.cpc}>
                      <Field name="cpc">
                        {({ field, form }: FieldProps) => (
                          <FormCurrencyInput form={form} field={field} placeholder="Nhập CPC..." />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      label="Từ khóa độc quyền"
                      invalid={errors.exclusiveKeywords && touched.exclusiveKeywords}
                      errorMessage={errors.exclusiveKeywords}
                    >
                      <TagInput
                        value={values.exclusiveKeywords || []}
                        placeholder="Nhập từ khóa..."
                        onChange={(tags) => setFieldValue('exclusiveKeywords', tags)}
                      />
                    </FormItem>

                    <FormItem
                      label="Từ khóa bị hạn chế"
                      invalid={errors.rejectedKeywords && touched.rejectedKeywords}
                      errorMessage={errors.rejectedKeywords}
                    >
                      <TagInput
                        value={values.rejectedKeywords || []}
                        placeholder="Nhập từ khóa..."
                        onChange={(tags) => setFieldValue('rejectedKeywords', tags)}
                      />
                    </FormItem>

                    <FormItem
                      label="Thiết bị"
                      invalid={errors.devices && touched.devices}
                      errorMessage={errors.devices}
                    >
                      <TagInput
                        value={values.devices || []}
                        placeholder="Nhập thiết bị..."
                        onChange={(tags) => setFieldValue('devices', tags)}
                      />
                    </FormItem>

                    <FormItem
                      label="Quốc gia"
                      invalid={errors.targetCountries && touched.targetCountries}
                      errorMessage={errors.targetCountries}
                    >
                      <TagInput
                        value={values.targetCountries || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('targetCountries', tags)}
                      />
                    </FormItem>

                    <FormItem
                      label="Quốc gia bị hạn chế"
                      invalid={errors.rejectedCountries && touched.rejectedCountries}
                      errorMessage={errors.rejectedCountries}
                    >
                      <TagInput
                        value={values.rejectedCountries || []}
                        placeholder="Nhập quốc gia..."
                        onChange={(tags) => setFieldValue('rejectedCountries', tags)}
                      />
                    </FormItem>

                    <FormItem label="Giới tính" invalid={errors.gender && touched.gender} errorMessage={errors.gender}>
                      <Field name="gender">
                        {({ field, form }: FieldProps) => (
                          <SelectCustom
                            isCreatable
                            field={field}
                            form={form}
                            options={gendersOptions}
                            placeholder="Chọn giới tính..."
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem label="Độ tuổi" invalid={errors.age && touched.age} errorMessage={errors.age}>
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

                {(isEdit || showFinalUrlTab) && (
                  <TabContent value="finalUrls">
                    <ProjectFinalUrlTable projectId={projectId || undefined} active={currentTab === 'finalUrls'} />
                  </TabContent>
                )}
              </div>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" disabled={isSubmitting} onClick={closeDialog}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo dự án'}
              </Button>
            </div>
          </FormContainer>
          {(isEdit || showFinalUrlTab) && <FinalUrlEditDialog />}
        </Form>
      )}
    </Formik>
  )
}
