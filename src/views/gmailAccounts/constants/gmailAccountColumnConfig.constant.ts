export const COLUMN_CONFIG = [
  { id: 'stt', label: 'STT', visible: true, required: true },
  { id: 'proxy', label: 'Proxy', visible: true, required: false },
  { id: 'name', label: 'Email', visible: true, required: false },
  { id: 'recoverMail', label: 'Mail khôi phục', visible: true, required: false },
  { id: 'code2fa', label: 'Mã 2FA', visible: true, required: false },
  { id: 'price', label: 'Giá tiền', visible: false, required: false },
  { id: 'manager', label: 'Người quản lý', visible: false, required: false },
  { id: 'creator', label: 'Người tạo', visible: false, required: false },
  { id: 'action', label: 'Hành động', visible: true, required: true },
] as const
