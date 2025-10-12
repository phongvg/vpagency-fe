import { forwardRef } from 'react'
import { UpdateUserRequest } from '@/views/system/userManagement/types'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserManagementForm, {
  FormikRef,
} from '@/views/system/userManagement/components/UserManagementForm'
import { useUpdateUserMutation } from '@/views/system/userManagement/hooks/useUsersQueries'
import { toastError, toastSuccess } from '@/utils/toast'

const UserManagemetEditContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedUser, setDrawerOpen } = useUserStore()

  const userMutation = useUpdateUserMutation()

  const handleSubmit = (values: UpdateUserRequest) => {
    if (!selectedUser) return

    userMutation.mutate(
      {
        userId: selectedUser.id,
        payload: values,
      },
      {
        onSuccess: () => {
          toastSuccess('Cập nhật thông tin người dùng thành công!')
          setDrawerOpen(false)
        },
        onError: () => {
          toastError('Cập nhật thông tin người dùng thất bại!')
        },
      },
    )
  }

  return (
    <UserManagementForm
      ref={ref}
      user={selectedUser}
      onFormSubmit={handleSubmit}
    />
  )
})

UserManagemetEditContent.displayName = 'UserManagemetEditContent'

export type { FormikRef }

export default UserManagemetEditContent
