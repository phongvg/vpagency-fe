import { useState, useEffect } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import {
  useCreateAdsAccountMutation,
  useUpdateAdsAccountMutation,
} from '@/views/adsAccounts/hooks/useAdsAccountsQueries'
import type { CreateAdsAccountRequest } from '@/views/adsAccounts/types'
import { AdsAccountStatus } from '@/@types/adsAccount'
import AsyncSelect from 'react-select/async'
import { apiGetAdsGroupList } from '@/services/AdsGroupService'
import { toastError } from '@/utils/toast'

const validationSchema = Yup.object().shape({
  uuid: Yup.string().required('Vui lòng nhập UUID'),
  status: Yup.string().required('Vui lòng chọn trạng thái'),
  gmail: Yup.string().email('Email không hợp lệ'),
  profileGenLogin: Yup.string(),
  recoverPassword: Yup.string(),
  twoFactorCode: Yup.string(),
  managerId: Yup.string(),
  adsGroupId: Yup.string(),
})

const statusOptions = [
  { value: AdsAccountStatus.ACTIVE, label: 'Hoạt động' },
  { value: AdsAccountStatus.INACTIVE, label: 'Không hoạt động' },
  { value: AdsAccountStatus.SUSPENDED, label: 'Bị đình chỉ' },
  { value: AdsAccountStatus.APPEALED, label: 'Đã kháng cáo' },
  { value: AdsAccountStatus.DELETED, label: 'Đã xóa' },
]

type AdsAccountFormProps = {
  onClose: () => void
}

export default function AdsAccountForm({ onClose }: AdsAccountFormProps) {
  const { selectedAdsAccount } = useAdsAccountStore()
  const createMutation = useCreateAdsAccountMutation()
  const updateMutation = useUpdateAdsAccountMutation()
  const [selectedManager, setSelectedManager] = useState<UserOption | null>(null)
  const [selectedAdsGroup, setSelectedAdsGroup] = useState<{ value: string; label: string } | null>(null)

  const isEdit = !!selectedAdsAccount

  useEffect(() => {
    if (selectedAdsAccount?.manager) {
      setSelectedManager({
        value: selectedAdsAccount.manager.id,
        label: `${selectedAdsAccount.manager.firstName || ''} ${selectedAdsAccount.manager.lastName || ''} (${
          selectedAdsAccount.manager.username
        })`.trim(),
        user: selectedAdsAccount.manager,
      })
    } else {
      setSelectedManager(null)
    }

    if (selectedAdsAccount?.adsGroupId) {
      setSelectedAdsGroup({
        value: selectedAdsAccount.adsGroupId,
        label: selectedAdsAccount.adsGroup?.name || '',
      })
    } else {
      setSelectedAdsGroup(null)
    }
  }, [selectedAdsAccount])

  const initialValues: CreateAdsAccountRequest = {
    uuid: selectedAdsAccount?.uuid || '',
    status: selectedAdsAccount?.status || AdsAccountStatus.ACTIVE,
    gmail: selectedAdsAccount?.gmail || '',
    profileGenLogin: selectedAdsAccount?.profileGenLogin || '',
    recoverPassword: selectedAdsAccount?.recoverPassword || '',
    twoFactorCode: selectedAdsAccount?.twoFactorCode || '',
    managerId: selectedAdsAccount?.managerId || undefined,
    adsGroupId: selectedAdsAccount?.adsGroupId || undefined,
  }

  const fetchAdsGroupOptions = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 2) return []

    try {
      const response = await apiGetAdsGroupList({ search: inputValue, page: 1, limit: 10 })
      if (response.data?.data?.data) {
        return response.data.data.data.map((group) => ({
          value: group.id,
          label: group.name,
        }))
      }
      return []
    } catch (error) {
      return []
    }
  }

  const handleSubmit = async (values: CreateAdsAccountRequest) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: selectedAdsAccount.id,
          payload: values,
        })
      } else {
        await createMutation.mutateAsync(values)
      }
      onClose()
    } catch (error: any) {
      const message =
        error?.response?.data?.message || (isEdit ? 'Cập nhật tài khoản ads thất bại' : 'Tạo tài khoản ads thất bại')
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
            <div className="gap-4 grid grid-cols-2">
              <FormItem label="UUID" asterisk invalid={errors.uuid && touched.uuid} errorMessage={errors.uuid}>
                <Field type="text" autoComplete="off" name="uuid" placeholder="Nhập UUID" component={Input} />
              </FormItem>

              <FormItem
                label="Trạng thái"
                asterisk
                invalid={errors.status && touched.status}
                errorMessage={errors.status}
              >
                <Field name="status">
                  {({ field, form }: any) => (
                    <Select
                      options={statusOptions}
                      value={statusOptions.find((option) => option.value === field.value)}
                      onChange={(option: any) => form.setFieldValue(field.name, option?.value)}
                      placeholder="Chọn trạng thái..."
                    />
                  )}
                </Field>
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Gmail" invalid={errors.gmail && touched.gmail} errorMessage={errors.gmail}>
                <Field type="email" autoComplete="off" name="gmail" placeholder="Nhập Gmail" component={Input} />
              </FormItem>

              <FormItem
                label="Profile Gen Login"
                invalid={errors.profileGenLogin && touched.profileGenLogin}
                errorMessage={errors.profileGenLogin}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="profileGenLogin"
                  placeholder="Nhập Profile Gen Login"
                  component={Input}
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem
                label="Mật khẩu khôi phục"
                invalid={errors.recoverPassword && touched.recoverPassword}
                errorMessage={errors.recoverPassword}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="recoverPassword"
                  placeholder="Nhập mật khẩu khôi phục"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Mã xác thực 2 yếu tố"
                invalid={errors.twoFactorCode && touched.twoFactorCode}
                errorMessage={errors.twoFactorCode}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="twoFactorCode"
                  placeholder="Nhập mã xác thực 2 yếu tố"
                  component={Input}
                />
              </FormItem>
            </div>

            <div className="grid-grid-cols-2-gap-4">
              <FormItem
                label="Nhóm tài khoản ads"
                invalid={touched.adsGroupId && Boolean(errors.adsGroupId)}
                errorMessage={errors.adsGroupId as string}
              >
                <Select
                  componentAs={AsyncSelect}
                  placeholder="Chọn nhóm tài khoản ads..."
                  value={selectedAdsGroup}
                  onChange={(option) => {
                    setSelectedAdsGroup(option)
                    setFieldValue('adsGroupId', option?.value)
                  }}
                  loadOptions={fetchAdsGroupOptions}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue.length < 2
                      ? 'Nhập tên nhóm tài khoản ads để tìm kiếm'
                      : 'Không tìm thấy nhóm tài khoản ads hợp lệ'
                  }
                  defaultOptions={false}
                  cacheOptions
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
            </div>

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
