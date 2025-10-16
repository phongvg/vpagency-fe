import { useRef } from 'react'
import { Drawer } from '@/components/ui'
import { useUserStore } from '@/views/systems/users/store/useUserStore'
import UserEditContent, {
  FormikRef,
} from '@/views/systems/users/components/UserEditContent'
import { DrawerFooter } from '@/views/systems/users/components/DrawerFooter'

export default function UserEditDialog() {
  const formikRef = useRef<FormikRef>(null)
  const { drawerOpen, setDrawerOpen, setSelectedUser } = useUserStore()

  const onDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedUser(null)
  }

  const formSubmit = () => {
    formikRef.current?.submitForm()
  }

  return (
    <Drawer
      isOpen={drawerOpen}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
    >
      <UserEditContent ref={formikRef} />
    </Drawer>
  )
}
