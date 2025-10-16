import { Button } from '@/components/ui'
import { MouseEvent } from 'react'

type DrawerFooterProps = {
  onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
  onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

export const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
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
