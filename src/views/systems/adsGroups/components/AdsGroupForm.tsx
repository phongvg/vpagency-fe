import { useState, useEffect } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAdsGroupStore } from '@/views/systems/adsGroups/store/useAdsGroupStore'
import {
  useCreateAdsGroupMutation,
  useUpdateAdsGroupMutation,
} from '@/views/systems/adsGroups/hooks/useAdsGroupsQueries'
import type { CreateAdsGroupRequest } from '@/views/systems/adsGroups/types'
import { toastError } from '@/utils/toast'
import AsyncSelect from 'react-select/async'
import { apiGetProjectList } from '@/services/ProjectService'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên nhóm'),
  description: Yup.string(),
  managerId: Yup.string(),
  projectId: Yup.string(),
})

type AdsGroupFormProps = {
  onClose: () => void
}

export default function AdsGroupForm({ onClose }: AdsGroupFormProps) {
  const { selectedAdsGroup } = useAdsGroupStore()
  const createMutation = useCreateAdsGroupMutation()
  const updateMutation = useUpdateAdsGroupMutation()
  const [selectedManager, setSelectedManager] = useState<UserOption | null>(null)
  const [selectedProject, setSelectedProject] = useState<{ value: string; label: string } | null>(null)

  const isEdit = !!selectedAdsGroup

  useEffect(() => {
    if (selectedAdsGroup?.manager) {
      setSelectedManager({
        value: selectedAdsGroup.manager.id,
        label: `${selectedAdsGroup.manager.firstName || ''} ${selectedAdsGroup.manager.lastName || ''} (${
          selectedAdsGroup.manager.username
        })`.trim(),
        user: selectedAdsGroup.manager,
      })
    } else {
      setSelectedManager(null)
    }

    if (selectedAdsGroup?.project) {
      setSelectedProject({
        value: selectedAdsGroup.project.id,
        label: selectedAdsGroup.project.name || '',
      })
    } else {
      setSelectedProject(null)
    }
  }, [selectedAdsGroup])

  const initialValues: CreateAdsGroupRequest = {
    name: selectedAdsGroup?.name || '',
    description: selectedAdsGroup?.description || '',
    managerId: selectedAdsGroup?.managerId || undefined,
    projectId: selectedAdsGroup?.projectId || undefined,
  }

  const fetchProjectOptions = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 2) return []

    try {
      const response = await apiGetProjectList({ search: inputValue, page: 1, limit: 10 })
      return response.data.data.data.map((project) => ({
        value: project.id,
        label: project.name,
      }))
    } catch (error) {
      console.error('Error fetching project options:', error)
      return []
    }
  }

  const handleSubmit = async (values: CreateAdsGroupRequest) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: selectedAdsGroup.id,
          payload: values,
        })
      } else {
        await createMutation.mutateAsync(values)
      }
      onClose()
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        (isEdit ? 'Cập nhật nhóm tài khoản ads thất bại' : 'Tạo nhóm tài khoản ads thất bại')
      toastError(message)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <FormContainer>
            <FormItem label="Tên nhóm" asterisk invalid={errors.name && touched.name} errorMessage={errors.name}>
              <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên nhóm" component={Input} />
            </FormItem>

            <FormItem
              label="Mô tả"
              invalid={errors.description && touched.description}
              errorMessage={errors.description}
            >
              <Field
                type="text"
                autoComplete="off"
                name="description"
                placeholder="Nhập mô tả"
                component={Input}
                textArea
                rows={3}
              />
            </FormItem>

            <FormItem
              label="Người quản lý"
              invalid={errors.managerId && touched.managerId}
              errorMessage={errors.managerId}
            >
              <UserSelect
                value={selectedManager}
                onChange={(option: UserOption | null) => {
                  setSelectedManager(option)
                  setFieldValue('managerId', option?.value || undefined)
                }}
                placeholder="Chọn người quản lý..."
                isClearable={true}
              />
            </FormItem>

            <FormItem
              label="Dự án"
              invalid={touched.projectId && Boolean(errors.projectId)}
              errorMessage={errors.projectId as string}
            >
              <Select
                componentAs={AsyncSelect}
                placeholder="Chọn dự án..."
                value={selectedProject}
                onChange={(option) => {
                  setSelectedProject(option)
                  setFieldValue('projectId', option?.value)
                }}
                loadOptions={fetchProjectOptions}
                noOptionsMessage={({ inputValue }) =>
                  inputValue.length < 2 ? 'Nhập tên dự án để tìm kiếm' : 'Không tìm thấy dự án hợp lệ'
                }
                defaultOptions={false}
                cacheOptions
              />
            </FormItem>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={onClose}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
