import service from "@/utils/request.ts"
import type {
  MaterialStockCreateRequest,
  MaterialStockListRequest,
  MaterialStockListResponse,
  MaterialStockVO
} from "@/types/inventory/materialStock.ts";

export function getMaterialStockList(data: MaterialStockListRequest) {
  return service.get<MaterialStockListResponse>('inventory/material-stock', {params: data})
}

export function getMaterialStockDetail(id: string) {
  return service.get<MaterialStockVO>(`inventory/material-stock/${id}`)
}

export function createMaterialStock(data: MaterialStockCreateRequest) {
  return service.post<MaterialStockVO>('inventory/material-stock', data)
}
