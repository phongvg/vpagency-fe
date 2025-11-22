import { Button, FormContainer, FormItem, Input, Tabs } from '@/components/ui'
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
      await updateMutation.mutateAsync({ projectId: projectId!, payload: projectData })
      closeDialog()
      return
    }

    // Create project but keep dialog open and reveal URL tab
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
      {({ errors, touched, isSubmitting }) => (
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
                {isEdit ? 'Cập nhật' : 'Tạo & Quản lý URL'}
              </Button>
            </div>
          </FormContainer>
          {(isEdit || showFinalUrlTab) && <FinalUrlEditDialog />}
        </Form>
      )}
    </Formik>
  )
}
