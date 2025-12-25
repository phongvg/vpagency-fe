import { theme } from 'twin.macro'

const twColor: Record<string, string> = theme`colors`

export const COLOR_1 = twColor.yellow['500']
export const COLOR_2 = twColor.emerald['500']
export const COLOR_3 = twColor.red['500']
export const COLOR_4 = twColor.blue['500']

export const COLORS = [COLOR_1, COLOR_2, COLOR_3, COLOR_4]
