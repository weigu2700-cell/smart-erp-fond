import type {PageResult} from '../common'

export type WorkshopStatus = 'ENABLE' | 'DISABLE'

export interface WorkshopVO {
  id: string
  name: string
  shortName?: string
  factoryId: string
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
  factoryId: string
  shortName?: string
  remark?: string
}

export interface WorkshopUpdateRequest {
  name?: string
  shortName?: string
  factoryId?: string
  remark?: string
}

export interface WorkshopStatusChangeRequest {
  id: string
  status: WorkshopStatus
}

export interface WorkshopListResponse extends PageResult<WorkshopVO> {}
