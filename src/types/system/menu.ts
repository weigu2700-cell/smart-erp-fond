export interface MenuItem {
  title: any
  id: string
  name: string
  path: string
  component: string
  icon?: string
  parentId?: string | number | null
  children?: MenuItem[]
}

export type MenuStatus = 'ENABLE' | 'DISABLE'

// 菜单分页查询参数（MenuGetDTO）
export interface MenuListRequest {
  page: number
  pageSize: number
  title: string | null
  name: string | null
  parentId: string | number | null
  visible: number | null
  status: MenuStatus | null
}

// 菜单列表项（MenuListVO）
export interface MenuListVO {
  id: string
  name: string
  title: string
  path: string
  parentId: string | null
  parentName: string | null
  component: string
  icon: string
  visible: number
  status: MenuStatus
}

// 菜单分页响应（PageMenuListVO）
export interface MenuListResponse {
  records: MenuListVO[]
  total: number
  size: number
  current: number
}

// 菜单新增/更新 DTO（MenuCreateDTO）
export interface MenuCreateRequest {
  name: string
  title: string
  path: string
  component: string
  icon: string | null
  parentId: string | number | null
  visible: number
  status: MenuStatus
}

// 保存表单（编辑时携带 id）
export interface MenuSaveRequest extends MenuCreateRequest {
  id?: string | number
}

// 菜单树节点（MenuTreeVO，用于父级菜单参照选择）
export interface MenuTreeNode {
  id: string
  name: string
  title: string
  path: string
  component: string
  icon?: string
  parentId?: string | null
  children?: MenuTreeNode[]
}
