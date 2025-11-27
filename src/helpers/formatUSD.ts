export const formatUSD = (amount: number | null | undefined): string => {
  if (!amount || isNaN(amount)) return '$0'
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
