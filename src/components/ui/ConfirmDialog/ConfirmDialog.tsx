import { Button, Dialog } from '@/components/ui'

import { HiOutlineExclamationCircle } from 'react-icons/hi'

interface ConfirmDialogProps {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
  type?: 'warning' | 'danger' | 'info'
}

export default function ConfirmDialog({
  isOpen,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
  loading = false,
  type = 'warning',
}: ConfirmDialogProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-red-600',
          confirmVariant: 'solid' as const,
          confirmColor: 'red-600',
        }
      case 'warning':
        return {
          iconColor: 'text-amber-600',
          confirmVariant: 'solid' as const,
          confirmColor: 'amber-600',
        }
      case 'info':
        return {
          iconColor: 'text-blue-600',
          confirmVariant: 'solid' as const,
          confirmColor: 'blue-600',
        }
      default:
        return {
          iconColor: 'text-amber-600',
          confirmVariant: 'solid' as const,
          confirmColor: 'amber-600',
        }
    }
  }

  const typeStyles = getTypeStyles()

  return (
    <Dialog isOpen={isOpen} width={400} closable={!loading} onClose={onCancel} onRequestClose={onCancel}>
      <div className="text-center">
        <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-12 h-12">
          <HiOutlineExclamationCircle className={`h-6 w-6 ${typeStyles.iconColor}`} />
        </div>

        <h3 className="mb-2 font-semibold text-gray-900 text-lg">{title}</h3>

        <p className="mb-6 text-gray-500 text-sm">{message}</p>

        <div className="flex gap-3">
          <Button block variant="default" disabled={loading} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            block
            variant={typeStyles.confirmVariant}
            loading={loading}
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
