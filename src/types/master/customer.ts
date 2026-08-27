import type {PageResult} from '../common'

export type CustomerStatus = 'ACTIVE' | 'INACTIVE'

export interface CustomerListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  status?: CustomerStatus | null
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
  status?: CustomerStatus | number
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
  remark?: string
}

export interface CustomerUpdateRequest extends CustomerCreateRequest {
  id?: string
  status?: CustomerStatus
}

export interface CustomerStatusChangeRequest {
  status: CustomerStatus
}
