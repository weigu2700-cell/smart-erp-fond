import type {PageResult} from '../common'

export type CustomerStatus = 'ACTIVE' | 'INACTIVE'

export interface CustomerListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  status?: number | null
}

export interface CustomerVO {
  id: string
  name: string
  code: string
  shortName?: string
  contactName?: string
  address?: string
  contact?: string
  phone?: string
  email?: string
  remark?: string
  status?: number
  createdTime?: string
}

export interface CustomerListResponse extends PageResult<CustomerVO> {}

export interface CustomerCreateRequest {
  name: string
  shortName?: string
  contactName?: string
  address?: string
  phone?: string
  email?: string
  status?: number
  remark?: string
}

export interface CustomerUpdateRequest extends CustomerCreateRequest {
  id?: string
  status?: number
}

export interface CustomerStatusChangeRequest {
  status: number
}