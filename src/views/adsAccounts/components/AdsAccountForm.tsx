import { useState, useEffect } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Field, Form, Formik, FieldArray, FieldProps } from 'formik'
import * as Yup from 'yup'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import {
  useCreateAdsAccountMutation,
  useUpdateAdsAccountMutation,
} from '@/views/adsAccounts/hooks/useAdsAccountsQueries'
import { apiGetAdsGroupList } from '@/services/AdsGroupService'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { AdsAccountStatus } from '@/enums/adsAccount.enum'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'

const accountValidationSchema = Yup.object().shape({
  uuid: Yup.string().required('Vui lòng nhập UUID'),
  status: Yup.string().required('Vui lòng chọn trạng thái'),
  gmail: Yup.string().email('Email không hợp lệ'),
  profileGenLogin: Yup.string(),
  recoverPassword: Yup.string(),
  twoFactorCode: Yup.string(),
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
  const isEdit = !!selectedAdsAccount

  const createMutation = useCreateAdsAccountMutation()
  const updateMutation = useUpdateAdsAccountMutation()

  const [selectedManager, setSelectedManager] = useState<UserOption | null>(null)

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
  }, [selectedAdsAccount])

  const initialValues = isEdit
    ? {
        accounts: [
          {
            uuid: selectedAdsAccount?.uuid || '',
            status: selectedAdsAccount?.status || AdsAccountStatus.ACTIVE,
            recoverPassword: selectedAdsAccount?.recoverPassword || '',
            twoFactorCode: selectedAdsAccount?.twoFactorCode || '',
          },
        ],
        managerId: selectedAdsAccount?.managerId || undefined,
        adsGroupId: selectedAdsAccount?.adsGroupId || undefined,
        gmail: selectedAdsAccount?.gmail || '',
        profileGenLogin: selectedAdsAccount?.profileGenLogin || '',
      }
    : {
        accounts: [
          {
            uuid: '',
            status: AdsAccountStatus.ACTIVE,
            recoverPassword: '',
            twoFactorCode: '',
          },
        ],
        managerId: undefined,
        adsGroupId: undefined,
        gmail: '',
        profileGenLogin: '',
      }

  const fetchAdsGroupOptions = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetAdsGroupList({ search: search || '', page, limit })
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

  const handleSubmit = async (values: any) => {
    if (isEdit) {
      const accountData = {
        ...values.accounts[0],
        managerId: values.managerId,
        adsGroupId: values.adsGroupId,
        gmail: values.gmail,
        profileGenLogin: values.profileGenLogin,
      }
      await updateMutation.mutateAsync({
        id: selectedAdsAccount.id,
        payload: accountData,
      })
    } else {
      for (const account of values.accounts) {
        const accountData = {
          ...account,
          managerId: values.managerId,
          adsGroupId: values.adsGroupId,
          gmail: values.gmail,
          profileGenLogin: values.profileGenLogin,
        }

        await createMutation.mutateAsync(accountData)
      }
    }

    onClose()
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
            <div className="gap-4 grid grid-cols-2 bg-gray-50 mb-4 p-4 rounded-lg">
              <FormItem
                label="Nhóm tài khoản ads"
                invalid={touched.adsGroupId && Boolean(errors.adsGroupId)}
                errorMessage={errors.adsGroupId as string}
              >
                {/* <Select
                  defaultOptions
                  cacheOptions
                  componentAs={AsyncSelect}
                  placeholder="Chọn nhóm tài khoản ads..."
                  value={selectedAdsGroup}
                  loadOptions={fetchAdsGroupOptions}
                  onChange={(option) => {
                    setSelectedAdsGroup(option)
                    setFieldValue('adsGroupId', option?.value)
                  }}
                /> */}
                <Field name="adsGroupId">
                  {({ field, form }: FieldProps) => (
                    <SelectCustom
                      isCreatable
                      field={field}
                      form={form}
                      fetchOptions={fetchAdsGroupOptions}
                      placeholder="Chọn nhóm tài khoản ads..."
                    />
                  )}
                </Field>
              </FormItem>

              <FormItem
                label="Người quản lý"
                invalid={typeof errors.managerId === 'string' && touched.managerId}
                errorMessage={errors.managerId as string}
              >
                <UserSelect
                  value={selectedManager}
                  placeholder="Chọn người quản lý..."
                  isClearable={true}
                  onChange={(option: UserOption | null) => {
                    setSelectedManager(option)
                    setFieldValue('managerId', option?.value || undefined)
                  }}
                />
              </FormItem>

              <FormItem
                label="Gmail"
                invalid={touched.gmail && Boolean(errors.gmail)}
                errorMessage={errors.gmail as string}
              >
                <Field type="email" autoComplete="off" name="gmail" placeholder="Nhập Gmail" component={Input} />
              </FormItem>

              <FormItem
                label="Profile Gen Login"
                invalid={touched.profileGenLogin && Boolean(errors.profileGenLogin)}
                errorMessage={errors.profileGenLogin as string}
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
                            icon={<HiOutlineTrash />}
                            onClick={() => remove(index)}
                          >
                            Xóa
                          </Button>
                        )}
                      </div>

                      <div className="gap-4 grid grid-cols-4">
                        <FormItem
                          asterisk
                          label="UUID"
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

                        <FormItem
                          asterisk
                          label="Trạng thái"
                          invalid={
                            touched.accounts?.[index]?.status && Boolean((errors.accounts as any)?.[index]?.status)
                          }
                          errorMessage={(errors.accounts as any)?.[index]?.status}
                        >
                          <Field name={`accounts.${index}.status`}>
                            {({ field, form }: FieldProps) => (
                              <Select
                                options={statusOptions}
                                value={statusOptions.find((option) => option.value === field.value)}
                                placeholder="Chọn trạng thái..."
                                onChange={(option: any) => form.setFieldValue(field.name, option?.value)}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                    </div>
                  ))}

                  {!isEdit && (
                    <Button
                      type="button"
                      variant="solid"
                      size="sm"
                      icon={<HiOutlinePlus />}
                      onClick={() =>
                        push({
                          uuid: '',
                          status: AdsAccountStatus.ACTIVE,
                          recoverPassword: '',
                          twoFactorCode: '',
                        })
                      }
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
