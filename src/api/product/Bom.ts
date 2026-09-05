import type { BomVo, GetPageBomRequest, GetPageBomResponse } from "@/types/product/Bom";
import service from "@/utils/request";

export function getPageBom (data:GetPageBomRequest) {
  return service.get<GetPageBomResponse>(
  '/prd/bom', 
  {params:data}
  )
}

export function getDetailBom (id:string) {
  return service.get<BomVo>(
    `/prd/bom/${id}`
  )
}