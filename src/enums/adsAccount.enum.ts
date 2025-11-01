export enum AdsAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  APPEALED = 'APPEALED',
  DELETED = 'DELETED',
}

export const AdsAccountStatusLabels: Record<AdsAccountStatus, string> = {
  [AdsAccountStatus.ACTIVE]: 'Hoạt động',
  [AdsAccountStatus.INACTIVE]: 'Không hoạt động',
  [AdsAccountStatus.SUSPENDED]: 'Bị đình chỉ',
  [AdsAccountStatus.APPEALED]: 'Đã kháng cáo',
  [AdsAccountStatus.DELETED]: 'Đã xóa',
}

export const AdsAccountStatusOptions = Object.values(AdsAccountStatus).map((status) => ({
  label: AdsAccountStatusLabels[status],
  value: status,
}))

export const AdsAccountStatusColors: Record<AdsAccountStatus, string> = {
  [AdsAccountStatus.ACTIVE]: 'emerald-500',
  [AdsAccountStatus.INACTIVE]: 'gray-500',
  [AdsAccountStatus.SUSPENDED]: 'red-500',
  [AdsAccountStatus.APPEALED]: 'yellow-500',
  [AdsAccountStatus.DELETED]: 'red-500',
}
