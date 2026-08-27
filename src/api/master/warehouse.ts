import service from "@/utils/request.ts"
import type {
  WarehouseCreateRequest,
  WarehouseListRequest,
  WarehouseListResponse,
  WarehouseStatus,
  WarehouseStatusChangeRequest,
  WarehouseUpdateRequest,
  WarehouseVO
} from "@/types/master/warehouse.ts";

export function getWarehouseList(data: WarehouseListRequest) {
  return service.get<WarehouseListResponse>('master/warehouse', {params: data})
}

export function getWarehouseDetail(id: string) {
  return service.get<WarehouseVO>(`master/warehouse/${id}`)
}

export function createWarehouse(data: WarehouseCreateRequest) {
  return service.post<void>('master/warehouse', data)
}

export function updateWarehouse(id: string, data: WarehouseUpdateRequest) {
  return service.put<void>(`master/warehouse/${id}`, data)
}

export function changeWarehouseStatus(id: string, status: WarehouseStatus) {
  return service.put<void>(`master/warehouse/${id}/status`, {status} as WarehouseStatusChangeRequest)
}
