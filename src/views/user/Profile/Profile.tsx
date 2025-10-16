import { Field, Form, Formik } from 'formik'
import { Avatar, Button, FormContainer, Input, Upload } from '@/components/ui'
import FormRow from '@/views/user/profile/components/FormRow'
import { HiOutlineUser } from 'react-icons/hi'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { UpdateUserInfoPayload } from '@/@types/user'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '@/utils/toast'
import { updateProfileValidationSchema } from '@/views/user/profile/schemas/updateProfile.schema'
import { useUpdateInfoMutation } from '@/views/user/updateInfo/hooks/useUpdateInfoMutation'
import { MESSAGES } from '@/constants/message.constant'

export default function Profile() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { user } = useAuthStore()

  const updateInfoMutation = useUpdateInfoMutation()

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

  const onSubmit = (
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
      },
      onError: () => {
        toastError(MESSAGES.UPDATE_PROFILE_ERROR)
      },
    })

    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        avatar: user?.avatar || null,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
      }}
      validationSchema={updateProfileValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting)
      }}
    >
      {({ touched, errors, isSubmitting }) => {
        const validatorProps = { touched, errors }
        return (
          <Form>
            <FormContainer>
              <FormRow name="avatar" label="Ảnh đại diện" {...validatorProps}>
                <Upload
                  className="cursor-pointer"
                  showList={false}
                  uploadLimit={1}
                  onChange={handleAvatarChange}
                >
                  <Avatar
                    className="shadow-lg"
                    size={140}
                    shape="circle"
                    icon={<HiOutlineUser />}
                    src={avatarPreview || user?.avatar || undefined}
                  />
                </Upload>
              </FormRow>
              <FormRow name="firstName" label="Họ" {...validatorProps}>
                <Field
                  type="text"
                  autoComplete="off"
                  name="firstName"
                  placeholder="Nhập họ"
                  component={Input}
                />
              </FormRow>
              <FormRow name="lastName" label="Tên" {...validatorProps}>
                <Field
                  type="text"
                  autoComplete="off"
                  name="lastName"
                  placeholder="Nhập tên"
                  component={Input}
                />
              </FormRow>
              <FormRow name="email" label="Email" {...validatorProps}>
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Nhập email"
                  component={Input}
                />
              </FormRow>
              <div className="mt-4 ltr:text-right">
                <Button variant="solid" loading={isSubmitting} type="submit">
                  Cập nhật
                </Button>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
}
