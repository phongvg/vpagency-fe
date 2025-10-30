export const formatVietnameseMoney = (amount: number | null | undefined): string => {
  if (!amount || isNaN(amount)) return '0 ₫'
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
