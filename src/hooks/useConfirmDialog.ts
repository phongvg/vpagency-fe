import { useState } from 'react'

interface UseConfirmDialogOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'danger' | 'info'
}

interface UseConfirmDialogReturn {
  isOpen: boolean
  showConfirm: (options?: UseConfirmDialogOptions) => Promise<boolean>
  confirmProps: {
    isOpen: boolean
    title: string
    message: string
    confirmText: string
    cancelText: string
    type: 'warning' | 'danger' | 'info'
    onConfirm: () => void
    onCancel: () => void
  }
}

export const useConfirmDialog = (defaultOptions: UseConfirmDialogOptions = {}): UseConfirmDialogReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null)
  const [currentOptions, setCurrentOptions] = useState<UseConfirmDialogOptions>(defaultOptions)

  const showConfirm = (options: UseConfirmDialogOptions = {}): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setCurrentOptions({ ...defaultOptions, ...options })
      setResolvePromise(() => resolve)
      setIsOpen(true)
    })
  }

  const handleConfirm = () => {
    setIsOpen(false)
    if (resolvePromise) {
      resolvePromise(true)
      setResolvePromise(null)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    if (resolvePromise) {
      resolvePromise(false)
      setResolvePromise(null)
    }
  }

  const confirmProps = {
    isOpen,
    title: currentOptions.title || 'Xác nhận',
    message: currentOptions.message || 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText: currentOptions.confirmText || 'Xác nhận',
    cancelText: currentOptions.cancelText || 'Hủy',
    type: currentOptions.type || ('warning' as const),
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  }

  return {
    isOpen,
    showConfirm,
    confirmProps,
  }
}
