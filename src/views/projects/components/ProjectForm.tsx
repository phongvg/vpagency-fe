import { Button, FormContainer, FormItem, Input, Tabs } from '@/components/ui'
import { Field, FieldProps, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import {
  useCreateProjectMutation,
  useGetProjectDetailQuery,
  useUpdateProjectMutation,
} from '@/views/projects/hooks/useProject'
import TagInput from '@/components/shared/TagInput'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { apiGetProjectTypeList } from '@/services/ProjectTypeService'
import { apiGetProjectStatusList } from '@/views/masterData/projectStatus/services/ProjectStatusService'
import { useCreateProjectTypeMutation } from '@/views/masterData/projectType/hooks/useProjectType'
import { useCreateProjectStatusMutation } from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { useState } from 'react'
import { UpdateProjectRequest } from '@/views/projects/types/project.type'

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
  finalUrls: Yup.array().of(finalUrlValidationSchema),
})

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

  const initialValues: UpdateProjectRequest = {
    name: project?.name || '',
    typeId: project?.typeId || '',
    statusId: project?.statusId || '',
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
                <TabNav value="finalUrls">Danh sách URL</TabNav>
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
                                label="Tên"
                                invalid={
                                  (touched.finalUrls as any)?.[index]?.name &&
                                  Boolean((errors.finalUrls as any)?.[index]?.name)
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
                                label="URL"
                                invalid={
                                  (touched.finalUrls as any)?.[index]?.finalURL &&
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
                                className="col-span-2"
                                label="Quốc gia"
                                invalid={
                                  (touched.finalUrls as any)?.[index]?.countries &&
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
