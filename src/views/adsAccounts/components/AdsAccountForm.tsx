import { useState, useEffect } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Field, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import {
  useCreateAdsAccountMutation,
  useUpdateAdsAccountMutation,
} from '@/views/adsAccounts/hooks/useAdsAccountsQueries'
import AsyncSelect from 'react-select/async'
import { apiGetAdsGroupList } from '@/services/AdsGroupService'
import { toastError, toastSuccess } from '@/utils/toast'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { AdsAccountStatus } from '@/enums/adsAccount.enum'

const accountValidationSchema = Yup.object().shape({
  uuid: Yup.string().required('Vui lòng nhập UUID'),
  status: Yup.string().required('Vui lòng chọn trạng thái'),
  gmail: Yup.string().email('Email không hợp lệ'),
  profileGenLogin: Yup.string(),
  recoverPassword: Yup.string(),
  twoFactorCode: Yup.string(),
  totalSpent: Yup.number(),
})

const validationSchema = Yup.object().shape({
  accounts: Yup.array().of(accountValidationSchema).min(1, 'Vui lòng thêm ít nhất 1 tài khoản'),
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

  const initialValues = isEdit
    ? {
        accounts: [
          {
            uuid: selectedAdsAccount?.uuid || '',
            status: selectedAdsAccount?.status || AdsAccountStatus.ACTIVE,
            gmail: selectedAdsAccount?.gmail || '',
            profileGenLogin: selectedAdsAccount?.profileGenLogin || '',
            recoverPassword: selectedAdsAccount?.recoverPassword || '',
            twoFactorCode: selectedAdsAccount?.twoFactorCode || '',
            totalSpent: selectedAdsAccount?.totalSpent || 0,
          },
        ],
        managerId: selectedAdsAccount?.managerId || undefined,
        adsGroupId: selectedAdsAccount?.adsGroupId || undefined,
      }
    : {
        accounts: [
          {
            uuid: '',
            status: AdsAccountStatus.ACTIVE,
            gmail: '',
            profileGenLogin: '',
            recoverPassword: '',
            twoFactorCode: '',
            totalSpent: 0,
          },
        ],
        managerId: undefined,
        adsGroupId: undefined,
      }

  const fetchAdsGroupOptions = async (inputValue: string) => {
    try {
      const response = await apiGetAdsGroupList({ search: inputValue, page: 1, limit: 10 })
      return response.data.data.items.map((group) => ({
        value: group.id,
        label: group.name,
      }))
    } catch {
      return []
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if (isEdit) {
        const accountData = {
          ...values.accounts[0],
          managerId: values.managerId,
          adsGroupId: values.adsGroupId,
        }
        await updateMutation.mutateAsync({
          id: selectedAdsAccount.id,
          payload: accountData,
        })
        toastSuccess('Cập nhật tài khoản ads thành công')
      } else {
        let successCount = 0
        let failCount = 0

        for (const account of values.accounts) {
          try {
            const accountData = {
              ...account,
              managerId: values.managerId,
              adsGroupId: values.adsGroupId,
            }
            await createMutation.mutateAsync(accountData)
            successCount++
          } catch {
            failCount++
          }
        }

        if (successCount > 0) {
          toastSuccess(
            `Tạo thành công ${successCount} tài khoản${failCount > 0 ? `, ${failCount} tài khoản thất bại` : ''}`,
          )
        }

        if (failCount > 0 && successCount === 0) {
          toastError('Tạo tài khoản Ads thất bại')
        }
      }
      onClose()
    } catch (error: any) {
      const message =
        error?.response?.data?.message || (isEdit ? 'Cập nhật tài khoản Ads thất bại' : 'Tạo tài khoản Ads thất bại')
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
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            <div className="gap-4 grid grid-cols-2 bg-gray-50 mb-4 p-4 rounded-lg">
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
                  defaultOptions
                  cacheOptions
                />
              </FormItem>
              <FormItem
                label="Người quản lý"
                invalid={typeof errors.managerId === 'string' && touched.managerId}
                errorMessage={errors.managerId as string}
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

            <FieldArray name="accounts">
              {({ push, remove }) => (
                <div className="space-y-6">
                  {values.accounts.map((_, index: number) => (
                    <div key={index} className="relative p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold">Tài khoản {index + 1}</h6>
                        {!isEdit && values.accounts.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="plain"
                            onClick={() => remove(index)}
                            icon={<HiOutlineTrash />}
                          >
                            Xóa
                          </Button>
                        )}
                      </div>

                      <div className="gap-4 grid grid-cols-2">
                        <FormItem
                          label="UUID"
                          asterisk
                          invalid={touched.accounts?.[index]?.uuid && Boolean((errors.accounts as any)?.[index]?.uuid)}
                          errorMessage={(errors.accounts as any)?.[index]?.uuid}
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name={`accounts.${index}.uuid`}
                            placeholder="Nhập UUID"
                            component={Input}
                          />
                        </FormItem>

                        <FormItem
                          label="Trạng thái"
                          asterisk
                          invalid={
                            touched.accounts?.[index]?.status && Boolean((errors.accounts as any)?.[index]?.status)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.status}
                        >
                          <Field name={`accounts.${index}.status`}>
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
                        <FormItem
                          label="Gmail"
                          invalid={
                            touched.accounts?.[index]?.gmail && Boolean((errors.accounts as any)?.[index]?.gmail)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.gmail}
                        >
                          <Field
                            type="email"
                            autoComplete="off"
                            name={`accounts.${index}.gmail`}
                            placeholder="Nhập Gmail"
                            component={Input}
                          />
                        </FormItem>

                        <FormItem
                          label="Profile Gen Login"
                          invalid={
                            touched.accounts?.[index]?.profileGenLogin &&
                            Boolean((errors.accounts as any)?.[index]?.profileGenLogin)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.profileGenLogin}
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name={`accounts.${index}.profileGenLogin`}
                            placeholder="Nhập Profile Gen Login"
                            component={Input}
                          />
                        </FormItem>
                      </div>

                      <div className="gap-4 grid grid-cols-2">
                        <FormItem
                          label="Mật khẩu khôi phục"
                          invalid={
                            touched.accounts?.[index]?.recoverPassword &&
                            Boolean((errors.accounts as any)?.[index]?.recoverPassword)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.recoverPassword}
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name={`accounts.${index}.recoverPassword`}
                            placeholder="Nhập mật khẩu khôi phục"
                            component={Input}
                          />
                        </FormItem>

                        <FormItem
                          label="Mã xác thực 2 yếu tố"
                          invalid={
                            touched.accounts?.[index]?.twoFactorCode &&
                            Boolean((errors.accounts as any)?.[index]?.twoFactorCode)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.twoFactorCode}
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name={`accounts.${index}.twoFactorCode`}
                            placeholder="Nhập mã xác thực 2 yếu tố"
                            component={Input}
                          />
                        </FormItem>
                      </div>

                      <div className="gap-4 grid grid-cols-2">
                        <FormItem
                          label="Tổng chi tiêu"
                          invalid={
                            touched.accounts?.[index]?.totalSpent &&
                            Boolean((errors.accounts as any)?.[index]?.totalSpent)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.totalSpent}
                        >
                          <Field
                            type="number"
                            autoComplete="off"
                            name={`accounts.${index}.totalSpent`}
                            placeholder="Nhập tổng chi tiêu"
                            component={Input}
                          />
                        </FormItem>
                      </div>
                    </div>
                  ))}

                  {!isEdit && (
                    <Button
                      type="button"
                      variant="solid"
                      size="sm"
                      onClick={() =>
                        push({
                          uuid: '',
                          status: AdsAccountStatus.ACTIVE,
                          gmail: '',
                          profileGenLogin: '',
                          recoverPassword: '',
                          twoFactorCode: '',
                        })
                      }
                      icon={<HiOutlinePlus />}
                    >
                      Thêm tài khoản
                    </Button>
                  )}
                </div>
              )}
            </FieldArray>

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
