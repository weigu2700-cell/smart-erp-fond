import type {PageResult} from '../common'

// 注意：库存流水接口分页参数是 pageNum（不是 page）
export interface TransactionListRequest {
  pageNum: number
  pageSize: number
  materialId?: string | null
  warehouseId?: string | null
  businessType?: string | null
  businessNo?: string | null
}

export interface TransactionVO {
  id: string
  warehouseId: string
  warehouseName?: string
  materialId: string
  materialCode?: string
  materialName?: string
  transactionType?: number
  transactionTypeName?: string
  businessType?: string
  businessNo?: string
  quantity?: number
  beforeOnHand?: number
  afterOnHand?: number
  beforeReserved?: number
  afterReserved?: number
  createTime?: string
}

export interface TransactionListResponse extends PageResult<TransactionVO> {}
