import { ReactNode } from 'react'

export type ToastType = 'success' | 'danger' | 'info' | 'warning'

export interface ToastOptions {
  type?: ToastType
  title?: string
  duration?: number
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  transitionType?: 'scale' | 'fade'
  closable?: boolean
}

export const showToast = async (
  message: string | ReactNode,
  options: ToastOptions = {},
) => {
  const {
    type = 'success',
    title,
    duration = 3000,
    placement = 'top-end',
    transitionType = 'scale',
    closable = true,
  } = options

  try {
    const { toast, Notification } = await import('@/components/ui')

    const content =
      typeof message === 'string' ? (
        <Notification
          title={title || getDefaultTitle(type)}
          type={type}
          closable={closable}
          duration={duration}
        >
          {message}
        </Notification>
      ) : (
        message
      )

    return toast.push(content, {
      placement,
      transitionType,
    })
  } catch (error) {
    console.log(typeof message === 'string' ? message : 'Toast message')
    return undefined
  }
}

export const showAlert = async (
  message: string | ReactNode,
  options: Omit<ToastOptions, 'title' | 'duration'> = {},
) => {
  const {
    type = 'success',
    placement = 'top-end',
    transitionType = 'scale',
    closable = true,
  } = options

  try {
    const { toast, Alert } = await import('@/components/ui')

    const content =
      typeof message === 'string' ? (
        <Alert type={type} showIcon closable={closable}>
          {message}
        </Alert>
      ) : (
        message
      )

    return toast.push(content, {
      placement,
      transitionType,
    })
  } catch (error) {
    console.log(typeof message === 'string' ? message : 'Alert message')
    return undefined
  }
}

export const toastSuccess = (
  message: string | ReactNode,
  options?: Omit<ToastOptions, 'type'>,
) => showToast(message, { ...options, type: 'success' })

export const toastError = (
  message: string | ReactNode,
  options?: Omit<ToastOptions, 'type'>,
) => showToast(message, { ...options, type: 'danger' })

export const toastInfo = (
  message: string | ReactNode,
  options?: Omit<ToastOptions, 'type'>,
) => showToast(message, { ...options, type: 'info' })

export const toastWarning = (
  message: string | ReactNode,
  options?: Omit<ToastOptions, 'type'>,
) => showToast(message, { ...options, type: 'warning' })

export const removeToast = async (key: string) => {
  try {
    const { toast } = await import('@/components/ui')
    toast.remove(key)
  } catch (error) {
    console.error('Failed to remove toast:', error)
  }
}

export const removeAllToasts = async () => {
  try {
    const { toast } = await import('@/components/ui')
    toast.removeAll()
  } catch (error) {
    console.error('Failed to remove all toasts:', error)
  }
}

function getDefaultTitle(type: ToastType): string {
  const titles = {
    success: 'Thành công',
    danger: 'Lỗi',
    info: 'Thông báo',
    warning: 'Cảnh báo',
  }
  return titles[type]
}

const toastUtil = {
  show: showToast,
  showAlert,
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
  warning: toastWarning,
  remove: removeToast,
  removeAll: removeAllToasts,
}

export default toastUtil
