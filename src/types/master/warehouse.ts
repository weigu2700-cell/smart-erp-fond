import type {PageResult} from '../common'

export type WarehouseStatus = 'ENABLE' | 'DISABLE'
export type WarehouseType = 'FINISHED' | 'MATERIAL' | 'SEMI_FINISHED' | 'SCRAP' | 'OTHER'

export interface WarehouseListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  factoryId?: string | null
  type?: WarehouseType | null
  status?: WarehouseStatus | null
}

export interface WarehouseVO {
  id: string
  name: string
  code: string
  type: WarehouseType
  address?: string
  remark?: string
  factoryId: string
  factoryName?: string
  status?: number
}

export interface WarehouseListResponse extends PageResult<WarehouseVO> {}

export interface WarehouseCreateRequest {
  name: string
  type: WarehouseType
  factoryId: string
  status?: WarehouseStatus
  address?: string
  remark?: string
}

export interface WarehouseUpdateRequest {
  name: string
  address?: string
  remark?: string
}

export interface WarehouseStatusChangeRequest {
  status: WarehouseStatus
}
