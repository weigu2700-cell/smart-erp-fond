import service from "@/utils/request.ts";
import type {
  createUserRequest,
  getUserDetailResponse,
  getUserListRequest,
  getUserListResponse,
  updateUserRequest,
  UserInfo,
  UserRoleAssignRequest
} from "@/types/system/user.ts";

export function getCurrentUser() {
  return service.get<UserInfo>('system/user/current')
}

export function getUserList(params: getUserListRequest) {
  return service.get<getUserListResponse>('system/user/list', {params})
}

export function createUser(data: createUserRequest) {
  return service.post('system/user/create', data)
}

export function getUserDetail(id: string) {
  return service.get<getUserDetailResponse>(`system/user/detail/${id}`)
}

export function updateUser(data: updateUserRequest) {
  return service.put(`system/user/${data.id}`, data)
}

// 分配角色（UserRoleAssignDTO，userId 按 int64 传 number）
export function assignUserRoles(data: UserRoleAssignRequest) {
  return service.post(`system/user/${data.userId}/roles`, {
    userId: Number(data.userId),
    roleIds: data.roleIds,
  })
}

