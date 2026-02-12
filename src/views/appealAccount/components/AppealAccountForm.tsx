import { FormContainer, FormItem } from '@/components/ui'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import {
  useCreateAppealAccountMutation,
  useGetAppealAccountDetailQuery,
  useUpdateAppealAccountMutation,
} from '@/views/appealAccount/hooks/useAppealAccount'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'
import { UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  profileName: Yup.string().required('Vui lòng nhập tên hồ sơ'),
  email: Yup.string().email('Vui lòng nhập đúng định dạng email').required('Vui lòng nhập email'),
  password: Yup.string().nullable(),
  recoveryEmail: Yup.string().email('Vui lòng nhập đúng định dạng email').nullable(),
  twoFa: Yup.string().nullable(),
  mcc: Yup.string().nullable(),
  uid: Yup.string().nullable(),
  appealPlatform: Yup.string().nullable(),
  appealedBy: Yup.string().nullable(),
  usedBy: Yup.string().nullable(),
  note: Yup.string().nullable(),
  note2: Yup.string().nullable(),
  rarityLevel: Yup.string().nullable(),
})

export default function AppealAccountForm() {
  const { appealAccountId, dialogOpen, closeDialog } = useAppealAccountStore()

  const isEdit = !!appealAccountId

  const { data: appealAccount } = useGetAppealAccountDetailQuery(appealAccountId!, dialogOpen)
  const createMutation = useCreateAppealAccountMutation()
  const updateMutation = useUpdateAppealAccountMutation()

  const initialValues: UpdateAppealAccountRequest = {
    profileName: appealAccount?.profileName || '',
    email: appealAccount?.email || '',
    password: appealAccount?.password || '',
    recoveryEmail: appealAccount?.recoveryEmail || '',
    twoFa: appealAccount?.twoFa || '',
    mcc: appealAccount?.mcc || '',
    uid: appealAccount?.uid || '',
    appealPlatform: appealAccount?.appealPlatform || '',
    appealedBy: appealAccount?.appealedBy || '',
    usedBy: appealAccount?.usedBy || '',
    note: appealAccount?.note || '',
    note2: appealAccount?.note2 || '',
    rarityLevel: appealAccount?.rarityLevel || '',
  }

  const handleSubmit = async (values: UpdateAppealAccountRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: appealAccountId,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }

    closeDialog()
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="gap-4 grid grid-cols-2 mt-4">
                <FormItem
                  asterisk
                  label="Tên hồ sơ"
                  invalid={errors.profileName && touched.profileName}
                  errorMessage={errors.profileName}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="profileName"
                    placeholder="Nhập tên hồ sơ..."
                    component={Input}
                  />
                </FormItem>

                <FormItem asterisk label="Email" invalid={errors.email && touched.email} errorMessage={errors.email}>
                  <Field type="text" autoComplete="off" name="email" placeholder="Nhập email..." component={Input} />
                </FormItem>

                <FormItem label="Mật khẩu" invalid={errors.password && touched.password} errorMessage={errors.password}>
                  <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="Nhập mật khẩu..."
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  label="Mail khôi phục"
                  invalid={errors.recoveryEmail && touched.recoveryEmail}
                  errorMessage={errors.recoveryEmail}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="recoveryEmail"
                    placeholder="Nhập mail khôi phục..."
                    component={Input}
                  />
                </FormItem>

                <FormItem label="Mã 2FA" invalid={errors.twoFa && touched.twoFa} errorMessage={errors.twoFa}>
                  <Field type="text" autoComplete="off" name="twoFa" placeholder="Nhập mã 2FA..." component={Input} />
                </FormItem>

                <FormItem label="MCC" invalid={errors.mcc && touched.mcc} errorMessage={errors.mcc}>
                  <Field type="text" autoComplete="off" name="mcc" placeholder="Nhập MCC..." component={Input} />
                </FormItem>

                <FormItem label="UID" invalid={errors.uid && touched.uid} errorMessage={errors.uid}>
                  <Field type="text" autoComplete="off" name="uid" placeholder="Nhập UID..." component={Input} />
                </FormItem>

                <FormItem
                  label="Sàn kháng được"
                  invalid={errors.appealPlatform && touched.appealPlatform}
                  errorMessage={errors.appealPlatform}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="appealPlatform"
                    placeholder="Nhập sàn kháng được..."
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  label="Người kháng"
                  invalid={errors.appealedBy && touched.appealedBy}
                  errorMessage={errors.appealedBy}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="appealedBy"
                    placeholder="Nhập người kháng..."
                    component={Input}
                  />
                </FormItem>

                <FormItem label="Người sử dụng" invalid={errors.usedBy && touched.usedBy} errorMessage={errors.usedBy}>
                  <Field
                    type="text"
                    autoComplete="off"
                    name="usedBy"
                    placeholder="Nhập người sử dụng..."
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  label="Cấp độ hiếm"
                  invalid={errors.rarityLevel && touched.rarityLevel}
                  errorMessage={errors.rarityLevel}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="rarityLevel"
                    placeholder="Nhập cấp độ hiếm..."
                    component={Input}
                  />
                </FormItem>

                <FormItem label="Ghi chú" invalid={errors.note && touched.note} errorMessage={errors.note}>
                  <Field type="text" autoComplete="off" name="note" placeholder="Nhập ghi chú..." component={Input} />
                </FormItem>

                <FormItem
                  label="Ghi chú 2"
                  invalid={errors.note2 && touched.note2}
                  errorMessage={errors.note2}
                  className="col-span-2"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="note2"
                    placeholder="Nhập ghi chú 2..."
                    component={Input}
                  />
                </FormItem>
              </div>

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
    </>
  )
}
