import service from "@/utils/request.ts"
import type {MenuItem, MenuCreateRequest, MenuListRequest, MenuListResponse, MenuListVO, MenuSaveRequest} from '@/types/system/menu.ts'

export function getCurrentUserMenu() {
  return service.get<MenuItem[]>('system/menu/current')
}

// 菜单树（传 roleId 时返回该角色已分配的菜单树，用于分配回显）
export function getMenuTree(roleId?: string) {
  return service.get<MenuItem[]>('system/menu/tree', {
    params: roleId ? {roleId} : {}
  })
}

// 菜单分页列表
export function getMenuList(data: MenuListRequest): Promise<MenuListResponse> {
  return service.get<MenuListResponse>('system/menu/list', {
    params: data
  })
}

// 菜单详情
export function getMenuDetail(id: number): Promise<MenuListVO> {
  return service.get<MenuListVO>(`system/menu/${id}`)
}

// 新增菜单
export function createMenu(data: MenuCreateRequest): Promise<unknown> {
  return service.post<unknown>('system/menu/create', data)
}

// 更新菜单（id 通过 query 参数传递，body 为 MenuCreateDTO）
export function updateMenu(data: MenuSaveRequest): Promise<unknown> {
  const {id, ...body} = data
  return service.put<unknown>(`system/menu/${id}`, body, {
    params: {id}
  })
}

// 删除菜单
export function deleteMenu(id: number): Promise<unknown> {
  return service.del<unknown>(`system/menu/${id}`)
}
