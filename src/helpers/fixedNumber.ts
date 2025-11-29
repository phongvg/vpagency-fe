export const fixedNumber = (num: number | null | undefined) => {
  try {
    return num ? Number(num.toFixed(2)) : 0
  } catch (error) {
    return 0
  }
}
