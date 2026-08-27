import type {PageResult} from '../common'

export interface UserInfo {
  id: string
  username: string
  realName: string
  phone?: string
  deptName?: string
}

export interface getUserListRequest {
  page: number
  pageSize: number
  username?: string | null
  deptId?: string | null
  status?: number | null
  phone?: string | null
}

// 用户分页记录项
export interface UserListRecord {
  id: string
  username: string
  realName: string
  phone?: string
  deptName?: string
  roles: {
    roleName: string
    roleKey: string
  }
}

export interface getUserListResponse extends PageResult<UserListRecord> {
  optimizeCountSql: string
  searchCount: string
}


export interface getUserDetailResponse {
  id: string
  username: string
  realName: string
  phone?: string
  deptId?: string
  deptName?: string
  roleIds?: string[]
  status?: number
}

export interface createUserRequest {
  username: string
  password: string
  realName: string
  deptId?: string | null
  roleIds?: string[] | null
}

export interface updateUserRequest {
  id: string
  username: string
  password?: string | null
  phone?: string | null
  deptId?: string | null
  roleIds?: string[] | null
  status?: number | null
}

// 分配角色参数（UserRoleAssignDTO，roleIds 为雪花 ID 字符串）
export interface UserRoleAssignRequest {
  userId: string
  roleIds: string[]
}
