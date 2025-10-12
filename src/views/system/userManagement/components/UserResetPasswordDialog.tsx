import { useRef } from 'react'
import { Drawer } from '@/components/ui'
import { DrawerFooter } from '@/views/system/userManagement/components/DrawerFooter'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserResetPasswordContent from '@/views/system/userManagement/components/UserResetPasswordContent'
import { FormikRef } from '@/views/system/userManagement/components/UserResetPasswordForm'

export default function UserResetPasswordDialog() {
  const formikRef = useRef<FormikRef>(null)
  const {
    resetPasswordDrawerOpen,
    setResetPasswordDrawerOpen,
    setSelectedUser,
  } = useUserStore()

  const onDrawerClose = () => {
    setResetPasswordDrawerOpen(false)
    setSelectedUser(null)
  }

  const formSubmit = () => {
    formikRef.current?.submitForm()
  }

  return (
    <Drawer
      isOpen={resetPasswordDrawerOpen}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
    >
      <UserResetPasswordContent ref={formikRef} />
    </Drawer>
  )
}
