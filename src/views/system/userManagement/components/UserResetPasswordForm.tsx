import { PasswordInput } from '@/components/shared'
import { FormContainer, FormItem } from '@/components/ui'
import { resetPasswordValidationSchema } from '@/views/system/userManagement/schemas/resetPassword.schema'
import { ResetPasswordUserRequest } from '@/views/system/userManagement/types'
import { Field, Form, Formik, FormikProps } from 'formik'
import { forwardRef } from 'react'

interface UserResetPasswordFormProps {
  onFormSubmit: (values: ResetPasswordUserRequest) => void
}

export type FormikRef = FormikProps<ResetPasswordUserRequest>

const UserResetPasswordForm = forwardRef<FormikRef, UserResetPasswordFormProps>(
  (props, ref) => {
    const { onFormSubmit } = props

    return (
      <Formik<ResetPasswordUserRequest>
        innerRef={ref}
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit?.(values)
          setSubmitting(false)
        }}
      >
        {({ touched, errors }) => (
          <div className="p-6">
            <Form>
              <FormContainer>
                <FormItem
                  label="Mật khẩu mới"
                  invalid={errors.newPassword && touched.newPassword}
                  errorMessage={errors.newPassword}
                >
                  <Field
                    autoComplete="off"
                    name="newPassword"
                    placeholder="Mật khẩu mới"
                    component={PasswordInput}
                  />
                </FormItem>
                <FormItem
                  label="Xác nhận mật khẩu"
                  invalid={errors.confirmPassword && touched.confirmPassword}
                  errorMessage={errors.confirmPassword}
                >
                  <Field
                    autoComplete="off"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    component={PasswordInput}
                  />
                </FormItem>
              </FormContainer>
            </Form>
          </div>
        )}
      </Formik>
    )
  },
)

UserResetPasswordForm.displayName = 'UserResetPasswordForm'

export default UserResetPasswordForm
