import { User } from '@/@types/user'
import { Avatar, FormContainer, FormItem, Input } from '@/components/ui'
import { updateUserValidationSchema } from '@/views/systems/users/schemas/updateUser.schema'
import { UpdateUserRequest } from '@/views/systems/users/types'
import { Field, Form, Formik, FormikProps } from 'formik'
import { forwardRef } from 'react'
import { HiOutlineUser } from 'react-icons/hi'
import UserRoleManagerField from './UserRoleManager'

interface UserEditFormProps {
  user: User | null
  onFormSubmit: (values: UpdateUserRequest) => void
}

export type FormikRef = FormikProps<UpdateUserRequest>

const UserEditForm = forwardRef<FormikRef, UserEditFormProps>((props, ref) => {
  const { user, onFormSubmit } = props

  return (
    <Formik<UpdateUserRequest>
      innerRef={ref}
      initialValues={{
        username: user?.username || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        roles: user?.roles || [],
      }}
      validationSchema={updateUserValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit?.(values)
        setSubmitting(false)
      }}
    >
      {({ touched, errors }) => (
        <div className="p-6">
          <Form>
            <FormContainer>
              <div className="flex justify-center mb-8">
                <Avatar
                  className="shadow-lg border-2"
                  size={100}
                  shape="circle"
                  icon={<HiOutlineUser />}
                  src={user?.avatar || ''}
                />
              </div>
              <FormItem label="Tên đăng nhập">
                <Field
                  disabled
                  type="text"
                  autoComplete="off"
                  name="username"
                  placeholder="Tên đăng nhập"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Họ"
                invalid={errors.firstName && touched.firstName}
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
                invalid={errors.lastName && touched.lastName}
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
              <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Phân quyền"
                invalid={errors.roles && touched.roles}
                errorMessage={
                  typeof errors.roles === 'string' ? errors.roles : undefined
                }
                className="mb-0"
              >
                <Field name="roles" component={UserRoleManagerField} />
              </FormItem>
            </FormContainer>
          </Form>
        </div>
      )}
    </Formik>
  )
})

UserEditForm.displayName = 'UserEditForm'

export default UserEditForm
