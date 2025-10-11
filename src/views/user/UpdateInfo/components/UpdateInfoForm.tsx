import { useState } from 'react'
import { CommonProps } from '@/@types/common'
import { urlConfig } from '@/configs/urls.config'
import {
  Alert,
  Button,
  Checkbox,
  FormContainer,
  FormItem,
  Input,
} from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { PasswordInput } from '@/components/shared'
import { UpdateUserInfoPayload } from '@/@types/user'
import { updateInfoValidationSchema } from '@/views/user/UpdateInfo/schemas/updateInfo.schema'
import { useUpdateInfoMutation } from '@/views/user/UpdateInfo/hooks/useUpdateInfoMutation'
import { MESSAGES } from '@/constants/message.constant'

export default function UpdateInfoForm() {
  const [message, setMessage] = useState<string | null>(null)

  const updateInfoMutation = useUpdateInfoMutation()

  const handleSubmit = async (
    values: UpdateUserInfoPayload,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)

    updateInfoMutation.mutate(values, {
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || MESSAGES.SOME_ERROR
        setMessage(errorMessage)
      },
    })

    setSubmitting(false)
  }

  return (
    <>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          <>{message}</>
        </Alert>
      )}
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={updateInfoValidationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
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
                  placeholder="Nhập tên đăng nhập"
                  component={Input}
                />
              </FormItem>
              <div className="gap-4 grid grid-cols-2">
                <FormItem
                  label="Họ"
                  invalid={(errors.firstName && touched.firstName) as boolean}
                  errorMessage={errors.firstName}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    placeholder="Họ"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Tên"
                  invalid={(errors.lastName && touched.lastName) as boolean}
                  errorMessage={errors.lastName}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    placeholder="Tên"
                    component={Input}
                  />
                </FormItem>
              </div>
              <FormItem
                label="Email"
                invalid={(errors.email && touched.email) as boolean}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Tên"
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

              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                Cập nhật thông tin
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  )
}
