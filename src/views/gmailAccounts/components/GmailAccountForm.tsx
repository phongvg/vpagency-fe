import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import {
  useCreateGmailAccountMutation,
  useUpdateGmailAccountMutation,
} from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { UpdateGmailAccountRequest } from '@/views/gmailAccounts/types'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string(),
  recoverMail: Yup.string().email('Email không hợp lệ'),
  recoverMailPassword: Yup.string(),
  code2fa: Yup.string(),
  phone: Yup.string(),
  proxy: Yup.string(),
  proxyPassword: Yup.string(),
  price: Yup.number().min(0, 'Số tiền lớn hơn hoặc bằng 0'),
})

type GmailAccountFormProps = {
  onClose: () => void
}

export default function GmailAccountForm({ onClose }: GmailAccountFormProps) {
  const { selectedGmailAccount } = useGmailAccountStore()

  const createMutation = useCreateGmailAccountMutation()
  const updateMutation = useUpdateGmailAccountMutation()

  const isEdit = !!selectedGmailAccount

  const initialValues: UpdateGmailAccountRequest = {
    name: selectedGmailAccount?.name || '',
    password: selectedGmailAccount?.password || '',
    recoverMail: selectedGmailAccount?.recoverMail || '',
    recoverMailPassword: selectedGmailAccount?.recoverMailPassword || '',
    code2fa: selectedGmailAccount?.code2fa || '',
    phone: selectedGmailAccount?.phone || '',
    proxy: selectedGmailAccount?.proxy || '',
    proxyPassword: selectedGmailAccount?.proxyPassword || '',
    price: selectedGmailAccount?.price || 0,
  }

  const handleSubmit = async (values: UpdateGmailAccountRequest) => {
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
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FormContainer>
            <div className="gap-4 grid grid-cols-2">
              <FormItem asterisk label="Email" invalid={errors.name && touched.name} errorMessage={errors.name}>
                <Field type="text" autoComplete="off" name="name" placeholder="Nhập email" component={Input} />
              </FormItem>

              <FormItem
                label="Email khôi phục"
                invalid={errors.recoverMail && touched.recoverMail}
                errorMessage={errors.recoverMail}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="recoverMail"
                  placeholder="Nhập email khôi phục"
                  component={Input}
                />
              </FormItem>

              <FormItem label="Mật khẩu" invalid={errors.password && touched.password} errorMessage={errors.password}>
                <Field type="text" autoComplete="off" name="password" placeholder="Nhập mật khẩu" component={Input} />
              </FormItem>

              <FormItem
                label="Mật khẩu email khôi phục"
                invalid={errors.recoverMailPassword && touched.recoverMailPassword}
                errorMessage={errors.recoverMailPassword}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="recoverMailPassword"
                  placeholder="Nhập mật khẩu"
                  component={Input}
                />
              </FormItem>

              <FormItem label="Mã 2FA" invalid={errors.code2fa && touched.code2fa} errorMessage={errors.code2fa}>
                <Field type="text" autoComplete="off" name="code2fa" placeholder="Nhập mã 2FA" component={Input} />
              </FormItem>

              <FormItem label="Số điện thoại" invalid={errors.phone && touched.phone} errorMessage={errors.phone}>
                <Field type="text" autoComplete="off" name="phone" placeholder="Nhập số điện thoại" component={Input} />
              </FormItem>

              <FormItem label="Proxy" invalid={errors.proxy && touched.proxy} errorMessage={errors.proxy}>
                <Field type="text" autoComplete="off" name="proxy" placeholder="Nhập proxy" component={Input} />
              </FormItem>

              <FormItem
                label="Mật khẩu Proxy"
                invalid={errors.proxyPassword && touched.proxyPassword}
                errorMessage={errors.proxyPassword}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="proxyPassword"
                  placeholder="Nhập mật khẩu proxy"
                  component={Input}
                />
              </FormItem>

              <FormItem label="Số tiền" invalid={errors.price && touched.price} errorMessage={errors.price}>
                <Field name="price">
                  {({ field, form }: FieldProps) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập số tiền" />
                  )}
                </Field>
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
