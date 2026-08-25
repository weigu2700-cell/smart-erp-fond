export interface UserInfo {
  id: string
  username: string
  realName: string
  phone?: string
  deptName?: string
}

export interface UserRole {
  roleId?: string
  roleName?: string
  roleKey?: string
}

export interface getUserListRequest {
  page: number
  pageSize: number
  username?: string | null
  deptId?: string | null
  status?: number | null
  phone?: string | null
}

export interface getUserListResponse {
  records: {
    id: string
    username: string
    realName: string
    phone?: string
    deptName?: string
    roles: {
      roleName: string
      roleKey: string
    }
  }[],
  total: number
  size: number
  current: number
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
