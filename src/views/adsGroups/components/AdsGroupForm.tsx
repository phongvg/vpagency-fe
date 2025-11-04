import { useState, useEffect } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import { useCreateAdsGroupMutation, useUpdateAdsGroupMutation } from '@/views/adsGroups/hooks/useAdsGroupsQueries'
import type { CreateAdsGroupRequest } from '@/views/adsGroups/types'
import { toastError } from '@/utils/toast'
import AsyncSelect from 'react-select/async'
import { apiGetProjectList } from '@/services/ProjectService'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên nhóm'),
  description: Yup.string(),
  managerId: Yup.string(),
})

type AdsGroupFormProps = {
  onClose: () => void
}

export default function AdsGroupForm({ onClose }: AdsGroupFormProps) {
  const { selectedAdsGroup } = useAdsGroupStore()
  const createMutation = useCreateAdsGroupMutation()
  const updateMutation = useUpdateAdsGroupMutation()
  const [selectedManager, setSelectedManager] = useState<UserOption | null>(null)

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
  }, [selectedAdsGroup])

  const initialValues: CreateAdsGroupRequest = {
    name: selectedAdsGroup?.name || '',
    description: selectedAdsGroup?.description || '',
    managerId: selectedAdsGroup?.managerId || undefined,
  }

  const handleSubmit = async (values: CreateAdsGroupRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: selectedAdsGroup.id,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }

    onClose()
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
