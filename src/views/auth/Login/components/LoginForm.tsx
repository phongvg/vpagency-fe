import { useState } from 'react'
import { CommonProps } from '@/@types/common'
import { urlConfig } from '@/configs/urls.config'
import { LoginFormSchema } from '@/views/auth/Login/types'
import {
  Alert,
  Button,
  Checkbox,
  FormContainer,
  FormItem,
  Input,
} from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { loginValidationSchema } from '@/views/auth/Login/schemas/login.schema'
import { ActionLink, PasswordInput } from '@/components/shared'
import useQuery from '@/utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useLoginMutation } from '@/views/auth/Login/hooks/useLogin'
import { MESSAGES } from '@/constants/message.constant'
import useAuth from '@/utils/hooks/useAuth'

interface LoginFormProps extends CommonProps {
  disableSubmit?: boolean
  forgotPasswordUrl?: string
  signUpUrl?: string
}

export default function LoginForm(props: LoginFormProps) {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = urlConfig.forgotPassword,
    signUpUrl = urlConfig.signUp,
  } = props
  const query = useQuery()
  const [message, setMessage] = useState<string | null>(null)
  const { handleLoginSuccess } = useAuth()

  const loginMutation = useLoginMutation()

  const handleSubmit = async (
    values: LoginFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const { username, password } = values
    setSubmitting(true)

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (response) => {
          const { accessToken, refreshToken, user } = response.data.data
          const redirectUrl = query.get(REDIRECT_URL_KEY)

          handleLoginSuccess({
            accessToken,
            refreshToken,
            user,
            redirectUrl: redirectUrl || undefined,
          })
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || MESSAGES.SOME_ERROR
          setMessage(errorMessage)
        },
      },
    )

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
          username: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            handleSubmit(values, setSubmitting)
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
                invalid={(errors.username && touched.username) as boolean}
                errorMessage={errors.username}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="username"
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
                {/* <ActionLink to={forgotPasswordUrl}>Quên mật khẩu?</ActionLink> */}
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                Đăng nhập
              </Button>
              {/* <div className="mt-4 text-center">
                <span>Chưa có tài khoản? </span>
                <ActionLink to={signUpUrl}>Đăng ký</ActionLink>
              </div> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}
