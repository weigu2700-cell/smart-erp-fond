import type {PageResult} from '../common'

export type ProductionLineStatus = 'ENABLE' | 'DISABLE'

export interface ProductionLineListRequest {
  page: number
  pageSize: number
  name?: string | null
  workshopId?: string | null
  status?: ProductionLineStatus | null
}

export interface ProductionLineVO {
  id: string
  name: string
  workshopId: string
  workshopName?: string
  capacityPerDay?: number
  remark?: string
  status: ProductionLineStatus
  createTime?: string
}

export interface ProductionLineListResponse extends PageResult<ProductionLineVO> {}

export interface ProductionLineCreateRequest {
  name: string
  workshopId: string
  capacityPerDay?: number
  remark?: string
}

export interface ProductionLineUpdateRequest extends ProductionLineCreateRequest {}
