import { forwardRef } from 'react'
import { UpdateUserRequest } from '@/views/system/userManagement/types'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserEditForm, {
  FormikRef,
} from '@/views/system/userManagement/components/UserEditForm'
import { useUpdateUserMutation } from '@/views/system/userManagement/hooks/useUsersQueries'
import { toastError, toastSuccess } from '@/utils/toast'
import { MESSAGES } from '@/constants/message.constant'

const UserEditContent = forwardRef<FormikRef>((_, ref) => {
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
    <UserEditForm ref={ref} user={selectedUser} onFormSubmit={handleSubmit} />
  )
})

UserEditContent.displayName = 'UserEditContent'

export type { FormikRef }

export default UserEditContent
