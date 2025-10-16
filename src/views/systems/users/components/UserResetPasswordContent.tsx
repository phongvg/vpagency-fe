import { MESSAGES } from '@/constants/message.constant'
import { toastSuccess } from '@/utils/toast'
import UserResetPasswordForm, {
  FormikRef,
} from '@/views/systems/users/components/UserResetPasswordForm'
import { useResetPasswordUserMutation } from '@/views/systems/users/hooks/useUsersQueries'
import { useUserStore } from '@/views/systems/users/store/useUserStore'
import { ResetPasswordUserRequest } from '@/views/systems/users/types'
import { forwardRef } from 'react'

const UserResetPasswordContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedUser, setResetPasswordDrawerOpen } = useUserStore()
  const userMutation = useResetPasswordUserMutation()

  const handleSubmit = (values: ResetPasswordUserRequest) => {
    if (!selectedUser) return

    const { newPassword } = values

    userMutation.mutate(
      {
        userId: selectedUser.id,
        payload: { newPassword },
      },
      {
        onSuccess: (response) => {
          toastSuccess(
            response.data.data.message || MESSAGES.RESET_PASSWORD_SUCCESS,
          )
          setResetPasswordDrawerOpen(false)
        },
      },
    )
  }

  return <UserResetPasswordForm ref={ref} onFormSubmit={handleSubmit} />
})

UserResetPasswordContent.displayName = 'UserResetPasswordContent'

export default UserResetPasswordContent
