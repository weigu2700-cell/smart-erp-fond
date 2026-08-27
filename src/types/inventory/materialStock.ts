import type {PageResult} from '../common'

// 注意：库存接口分页参数是 pageNum（不是 page）
export interface MaterialStockListRequest {
  pageNum: number
  pageSize: number
  materialId?: string | null
  warehouseId?: string | null
}

export interface MaterialStockVO {
  id: string
  materialId: string
  materialName?: string
  materialCode?: string
  warehouseId: string
  warehouseName?: string
  onHand?: number
  reserved?: number
  available?: number
}

export interface MaterialStockListResponse extends PageResult<MaterialStockVO> {}

export interface MaterialStockCreateRequest {
  materialId: string
  warehouseId: string
}
