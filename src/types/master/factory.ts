import type {PageResult} from '../common'

export type FactoryStatus = 'ENABLE' | 'DISABLE'

export interface FactoryListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  shortName?: string | null
  status?: FactoryStatus | null
}

export interface FactoryVO {
  id: string
  name: string
  code: string
  shortName: string
  status: FactoryStatus
  address?: string
  remark?: string
}

export interface FactoryListResponse extends PageResult<FactoryVO> {}


export interface addOrUpdateFactoryRequest {
  name: string
  shortName: string
  address?: string
  remark?: string
}

export interface changeFactoryStatusRequest {
  id: string
  status: FactoryStatus
}


