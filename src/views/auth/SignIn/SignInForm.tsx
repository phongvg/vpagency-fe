import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'

interface SignInFormProps extends CommonProps {
  disableSubmit?: boolean
  forgotPasswordUrl?: string
  signUpUrl?: string
}

type SignInFormSchema = {
  userName: string
  password: string
  rememberMe: boolean
}

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
  rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    signUpUrl = '/sign-up',
  } = props

  const [message, setMessage] = useTimeOutMessage()

  const { signIn } = useAuth()

  const onSignIn = async (
    values: SignInFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const { userName, password } = values
    setSubmitting(true)

    const result = await signIn({ userName, password })

    if (result?.status === 'failed') {
      setMessage(result.message)
    }

    setSubmitting(false)
  }

  return (
    <div className={className}>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          <>{message}</>
        </Alert>
      )}
      <Formik
        initialValues={{
          userName: 'admin',
          password: '123456',
          rememberMe: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting)
          } else {
            setSubmitting(false)
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Tên đăng nhập"
                invalid={(errors.userName && touched.userName) as boolean}
                errorMessage={errors.userName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="userName"
                  placeholder="Tên đăng nhập"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Mật khẩu"
                invalid={(errors.password && touched.password) as boolean}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Mật khẩu"
                  component={PasswordInput}
                />
              </FormItem>
              <div className="flex justify-between mb-6">
                <Field className="mb-0" name="rememberMe" component={Checkbox}>
                  Lưu thông tin đăng nhập
                </Field>
                <ActionLink to={forgotPasswordUrl}>Quên mật khẩu?</ActionLink>
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
              <div className="mt-4 text-center">
                <span>Chưa có tài khoản? </span>
                <ActionLink to={signUpUrl}>Đăng ký</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignInForm
