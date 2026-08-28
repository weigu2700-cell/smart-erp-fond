import type {PageResult} from '../common'

export type ProductionLineStatus = 'ENABLE' | 'DISABLE'

export interface ProductionLineListRequest {
  page: number
  pageSize: number
  name?: string | null
  workshopId?: string | null
  status?: number | null
}

export interface ProductionLineVO {
  id: string
  name: string
  workshopId: string
  workshopName?: string
  capacityPerDay?: number
  remark?: string
  status: number
  createTime?: string
}

export interface ProductionLineListResponse extends PageResult<ProductionLineVO> {}

export interface ProductionLineCreateRequest {
  name: string
  workshopId: string
  status?: number
  capacityPerDay?: number
  remark?: string
}

export interface ProductionLineUpdateRequest extends ProductionLineCreateRequest {}