export type PermissionType = 'MENU' | 'BUTTON'
export type PermissionStatus = 'ENABLE' | 'DISABLE'

// 权限记录 / 树节点（PermissionTreeVO）
export interface PermissionNode {
  id: number
  name: string
  code: string
  type: PermissionType
  parentId: number | null
  parentName: string | null
  sort: number
  status: PermissionStatus
  remark: string | null
  children?: PermissionNode[]
}

// 分页查询参数（PermissionGetDTO）
export interface PermissionListRequest {
  page: number
  pageSize: number
  name?: string | null
  code?: string | null
  type?: PermissionType | null
  status?: PermissionStatus | null
  parentId?: number | null
}

// 分页列表响应（PagePermissionTreeVO）
export interface PermissionListResponse {
  records: PermissionNode[]
  total: number
  size: number
  current: number
}

// 新增参数（PermissionCreateDTO）
export interface PermissionCreateRequest {
  name: string
  code: string
  type: PermissionType
  parentId?: number | null
  sort?: number
  status: PermissionStatus
  remark?: string | null
}

// 更新参数（PermissionUpdateDTO，以 query 参数传递）
export interface PermissionUpdateRequest {
  id: number
  name: string
  code: string
  type: PermissionType
  parentId?: number | null
  status: PermissionStatus
  remark?: string | null
}

// 新增/编辑共用表单，id 用于编辑
export interface PermissionSaveRequest {
  id?: number
  name: string
  code: string
  type: PermissionType
  parentId?: number | null
  sort?: number
  status: PermissionStatus
  remark?: string | null
}
