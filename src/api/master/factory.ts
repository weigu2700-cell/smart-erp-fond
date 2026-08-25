import service from "@/utils/request.ts"
import type {
  addOrUpdateFactoryRequest, changeFactoryStatusRequest,
  FactoryListRequest,
  FactoryListResponse,
  FactoryVO
} from "@/types/master/factory.ts";

export function getFactoryList(data: FactoryListRequest) {
  return service.get<FactoryListResponse>('master/factory', {params: data})
}

export function getFactoryDetail(id: string) {
  return service.get<FactoryVO>(`master/factory/${id}`)
}

export function addFactory(data: addOrUpdateFactoryRequest) {
  return service.post<void>('master/factory', data)
}

export function updateFactory(id: string,data: addOrUpdateFactoryRequest) {
  return service.put<void>(`master/factory/${id}`,data)
}

export function changeFactoryStatus(data: changeFactoryStatusRequest) {
  return service.put<void>(`master/factory/${data.id}/status`, data)
}
