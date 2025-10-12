import { useState, useEffect } from 'react'
import {
  Alert,
  Button,
  FormContainer,
  FormItem,
  Input,
  Upload,
  Avatar,
} from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { PasswordInput } from '@/components/shared'
import { UpdateUserInfoPayload } from '@/@types/user'
import { updateInfoValidationSchema } from '@/views/user/UpdateInfo/schemas/updateInfo.schema'
import { useUpdateInfoMutation } from '@/views/user/UpdateInfo/hooks/useUpdateInfoMutation'
import { MESSAGES } from '@/constants/message.constant'
import { HiOutlineUser } from 'react-icons/hi'
import { toastError, toastSuccess } from '@/utils/toast'

export default function UpdateInfoForm() {
  const [message, setMessage] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const updateInfoMutation = useUpdateInfoMutation(true)

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleAvatarChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]

      if (file.size > 5 * 1024 * 1024) {
        toastError(MESSAGES.MAX_FILE_SIZE)
        return
      }

      if (!file.type.startsWith('image/')) {
        toastError(MESSAGES.INVALID_FILE_TYPE)
        return
      }

      setAvatarFile(file)

      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleSubmit = async (
    values: UpdateUserInfoPayload,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)

    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof UpdateUserInfoPayload]
      if (value) {
        formData.append(key, value)
      }
    })

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    updateInfoMutation.mutate(formData, {
      onSuccess: () => {
        toastSuccess(MESSAGES.UPDATE_PROFILE_SUCCESS)
        setMessage(null)
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || MESSAGES.UPDATE_PROFILE_ERROR
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
              <FormItem label="Ảnh đại diện">
                <div className="flex items-center space-x-4">
                  <Avatar
                    size={80}
                    shape="circle"
                    src={avatarPreview || undefined}
                    icon={<HiOutlineUser />}
                  />
                  <Upload
                    accept="image/*"
                    multiple={false}
                    onChange={handleAvatarChange}
                    showList={false}
                  >
                    <Button type="button" size="sm" variant="twoTone">
                      Chọn ảnh
                    </Button>
                  </Upload>
                </div>
                <p className="mt-2 text-gray-500 text-xs">
                  Định dạng: JPG, PNG. Kích thước tối đa: 5MB
                </p>
              </FormItem>

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
