import { Button } from '@/components/ui'

type DrawerFooterProps = {
  onCancel: () => void
  onSaveClick: () => void
}

export function DrawerFooter({ onCancel, onSaveClick }: DrawerFooterProps) {
  return (
    <div className="flex justify-end items-center gap-2 w-full text-right">
      <Button size="sm" variant="plain" onClick={onCancel}>
        Hủy
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Lưu
      </Button>
    </div>
  )
}
