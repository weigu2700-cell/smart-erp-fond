import type {PageResult} from '../common'

export type SupplierStatus = 'ACTIVE' | 'INACTIVE'

export interface SupplierListRequest {
  page: number
  pageSize: number
  code?: string | null
  name?: string | null
  shortName?: string | null
  contactName?: string | null
  phone?: string | null
  email?: string | null
}

export interface SupplierVO {
  id: string
  code: string
  name: string
  shortName?: string
  contactName?: string
  address?: string
  phone?: string
  email?: string
  remark?: string
  status?: SupplierStatus | number
  createdTime?: string
}

export interface SupplierListResponse extends PageResult<SupplierVO> {}

export interface SupplierCreateRequest {
  name: string
  shortName?: string
  contactName?: string
  address?: string
  phone?: string
  email?: string
  remark?: string
}

export interface SupplierUpdateRequest extends SupplierCreateRequest {}
