import { forwardRef } from 'react'
import { UpdateUserRequest } from '@/views/system/userManagement/types'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserManagementForm, {
  FormikRef,
} from '@/views/system/userManagement/components/UserManagementForm'
import { useUpdateUser } from '@/views/system/userManagement/hooks/useUsersQueries'

const UserManagemetEditContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedUser, setDrawerOpen } = useUserStore()

  const userMutation = useUpdateUser()

  const handleSubmit = (values: UpdateUserRequest) => {
    if (!selectedUser) return

    userMutation.mutate({
      userId: selectedUser.id,
      payload: values,
    })

    setDrawerOpen(false)
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
