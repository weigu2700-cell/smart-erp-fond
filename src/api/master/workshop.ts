import service from "@/utils/request.ts"
import type {
  WorkshopCreateRequest,
  WorkshopListRequest,
  WorkshopListResponse, WorkshopStatus, WorkshopUpdateRequest,
  WorkshopVO
} from "@/types/master/workshop.ts";

export function getWorkshopList(data: WorkshopListRequest) {
  return service.get<WorkshopListResponse>('master/workshop', {params: data})
}

export function getWorkshopDetail(id: string) {
  return service.get<WorkshopVO>(`master/workshop/${id}`)
}

export function createWorkshop(data: WorkshopCreateRequest) {
  return service.post<void>('master/workshop', data)
}

export function updateWorkshop(id: string, data: WorkshopUpdateRequest) {
  return service.put<void>(`master/workshop/${id}`, data)
}

export function changeWorkshopStatus(id: string, status: WorkshopStatus) {
  return service.put<void>(`master/workshop/${id}/status`, {status})
}
