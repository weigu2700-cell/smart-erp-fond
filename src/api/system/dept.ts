import service from "@/utils/request.ts"
import type {
  deptDetail,
  deptRequest,
  deptResponse,
  deptTree,
  saveDeptRequest
} from "@/types/system/dept.ts"


export function getDeptList(data: deptRequest) {
  return service.get<deptResponse>('/system/dept/list', {params: data})
}

export function getDeptTree() {
  return service.get<deptTree[]>('/system/dept/tree')
}

export function saveDept(data: saveDeptRequest) {
  return service.post<void>('/system/dept/add', data)
}

export function getDeptDetail(id: string) {
  return service.get<deptDetail>(`/system/dept/${id}`)
}

export function updateDept(data: saveDeptRequest) {
  return service.put<void>('/system/dept', data)
}
