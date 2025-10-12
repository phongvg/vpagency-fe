import { forwardRef } from 'react'
import { UpdateUserRequest } from '@/views/system/userManagement/types'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserManagementForm, {
  FormikRef,
} from '@/views/system/userManagement/components/UserManagementForm'
import { useUpdateUserMutation } from '@/views/system/userManagement/hooks/useUsersQueries'
import { toastError, toastSuccess } from '@/utils/toast'
import { MESSAGES } from '@/constants/message.constant'

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
          toastSuccess(MESSAGES.UPDATE_USER_SUCCESS)
          setDrawerOpen(false)
        },
        onError: () => {
          toastError(MESSAGES.UPDATE_USER_ERROR)
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
