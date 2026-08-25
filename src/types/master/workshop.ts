export type WorkshopStatus = 'ENABLE' | 'DISABLE'

export interface WorkshopVO {
  id: number
  name: string
  shortName?: string
  factoryId: number
  factoryName?: string
  remark?: string
  status: WorkshopStatus
}

export interface WorkshopListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  factoryId?: string | null
}

export interface WorkshopCreateRequest {
  name: string
  factoryId: number
  shortName?: string
  remark?: string
}

export interface WorkshopUpdateRequest {
  name?: string
  shortName?: string
  factoryId?: number
  remark?: string
}

export interface WorkshopStatusChangeRequest {
  id: number
  status: WorkshopStatus
}

export interface WorkshopListResponse {
  records: WorkshopVO[]
  total: number
  size: number
  current: number
  pages: number
}
