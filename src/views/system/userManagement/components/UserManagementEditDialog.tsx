import { MouseEvent, useRef } from 'react'
import { Button, Drawer } from '@/components/ui'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import UserManagemetEditContent from '@/views/system/userManagement/components/UserManagemetEditContent'

type DrawerFooterProps = {
  onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
  onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
  return (
    <div className="w-full text-right">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Hủy
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Lưu
      </Button>
    </div>
  )
}

export default function UserManagementEditDialog() {
  const formikRef = useRef<any>(null)
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
      <UserManagemetEditContent ref={formikRef} />
    </Drawer>
  )
}
