import { forwardRef } from 'react'
import { UpdateUserRequest } from '@/views/systems/users/types'
import { useUserStore } from '@/views/systems/users/store/useUserStore'
import UserEditForm, { FormikRef } from '@/views/systems/users/components/UserEditForm'
import { useUpdateUserMutation } from '@/views/systems/users/hooks/useUsersQueries'

const UserEditContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedUser, setDrawerOpen } = useUserStore()

  const userMutation = useUpdateUserMutation()

  const handleSubmit = (values: UpdateUserRequest) => {
    if (!selectedUser) return

    userMutation.mutate({
      userId: selectedUser.id,
      payload: values,
    })

    setDrawerOpen(false)
  }

  return <UserEditForm ref={ref} user={selectedUser} onFormSubmit={handleSubmit} />
})

UserEditContent.displayName = 'UserEditContent'

export type { FormikRef }

export default UserEditContent
