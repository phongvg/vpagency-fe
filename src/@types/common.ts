import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

export type TableQueries = {
  total?: number
  pageIndex?: number
  pageSize?: number
  query?: string
  sort?: {
    order: 'asc' | 'desc' | ''
    key: string | number
  }
}

export type Meta = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export type BaseResponse<T> = {
  success: boolean
  code?: string
  message: string
  data: T
}

export type BaseListResponse<T> = {
  success: boolean
  code?: string
  message?: string
  data: {
    items: T[]
    meta: Meta
  }
}

export type BaseListResponseWithoutPagination<T> = {
  success: boolean
  code?: string
  message?: string
  data: T[]
}

export type SortOrder = 'asc' | 'desc' | ''

export type CommonFilterRequest = {
  page: number
  limit: number
  search: string
  sortBy?: string
  sortOrder?: SortOrder
}

export type SelectOption = {
  value: string
  label: string
}
