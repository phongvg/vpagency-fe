import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import UserSelect, { UserOption } from '@/components/ui/UserSelect/UserSelect'
import {
  useCreateGmailAccountMutation,
  useUpdateGmailAccountMutation,
} from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import type { CreateGmailAccountRequest } from '@/views/gmailAccounts/types'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  twofa: Yup.string().nullable(),
  phone: Yup.string().nullable(),
  proxy: Yup.string().nullable(),
  amount: Yup.number().min(0, 'Số tiền lớn hơn hoặc bằng 0'),
  managerId: Yup.string().nullable(),
})

type GmailAccountFormProps = {
  onClose: () => void
}

export default function GmailAccountForm({ onClose }: GmailAccountFormProps) {
  const { selectedGmailAccount } = useGmailAccountStore()

  const [selectedManager, setSelectedManager] = useState<UserOption | null>(null)

  const createMutation = useCreateGmailAccountMutation()
  const updateMutation = useUpdateGmailAccountMutation()

  const isEdit = !!selectedGmailAccount

  useEffect(() => {
    if (selectedGmailAccount?.manager) {
      setSelectedManager({
        value: selectedGmailAccount.manager.id,
        label: `${selectedGmailAccount.manager.firstName || ''} ${selectedGmailAccount.manager.lastName || ''} (${
          selectedGmailAccount.manager.username
        })`.trim(),
        user: selectedGmailAccount.manager,
      })
    } else {
      setSelectedManager(null)
    }
  }, [selectedGmailAccount])

  const initialValues: CreateGmailAccountRequest = {
    email: selectedGmailAccount?.email || '',
    password: selectedGmailAccount?.password || '',
    twofa: selectedGmailAccount?.twofa || '',
    phone: selectedGmailAccount?.phone || '',
    proxy: selectedGmailAccount?.proxy || '',
    amount: selectedGmailAccount?.amount || 0,
    managerId: selectedGmailAccount?.manager?.id || null,
  }

  const handleSubmit = async (values: CreateGmailAccountRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: selectedGmailAccount.id,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
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
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <FormContainer>
            <div className="gap-x-4 grid grid-cols-2">
              <FormItem asterisk label="Email" invalid={errors.email && touched.email} errorMessage={errors.email}>
                <Field type="text" autoComplete="off" name="email" placeholder="Nhập email" component={Input} />
              </FormItem>

              <FormItem label="Mật khẩu" invalid={errors.password && touched.password} errorMessage={errors.password}>
                <Field
                  type="password"
                  autoComplete="off"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  component={Input}
                />
              </FormItem>

              <FormItem label="Mã 2FA" invalid={errors.twofa && touched.twofa} errorMessage={errors.twofa}>
                <Field type="text" autoComplete="off" name="twofa" placeholder="Nhập mã 2FA" component={Input} />
              </FormItem>

              <FormItem label="Số điện thoại" invalid={errors.phone && touched.phone} errorMessage={errors.phone}>
                <Field type="text" autoComplete="off" name="phone" placeholder="Nhập số điện thoại" component={Input} />
              </FormItem>

              <FormItem label="Proxy" invalid={errors.proxy && touched.proxy} errorMessage={errors.proxy}>
                <Field type="text" autoComplete="off" name="proxy" placeholder="Nhập proxy" component={Input} />
              </FormItem>

              <FormItem label="Số tiền" invalid={errors.amount && touched.amount} errorMessage={errors.amount}>
                <Field name="amount">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập số tiền" />
                  )}
                </Field>
              </FormItem>

              <FormItem
                label="Người quản lý"
                invalid={errors.managerId && touched.managerId}
                errorMessage={errors.managerId}
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
