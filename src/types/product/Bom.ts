export interface GetPageBomRequest {
  pageNum: number;
  pageSize: number;
  bomNo?: string | null;
  materialId?: string| null;
  status?: string| null;
}

export interface BomItemVo {
  id: number;
  bomId: number;
  lineNo: number;
  componentMaterialId: string;
  componentMaterialCode: string;
  componentMaterialName: string;
  quantity: number;
  lossRate: number;
  remark: string;
}

export interface BomVo {
  id: number;
  bomNo: string;
  materialId: string;
  materialCode: string;
  materialName: string;
  status: string;
  version: number;
  remark: string;
  createTime: string;
  updateTime: string;
  bomItems: BomItemVo[];
}

export interface GetPageBomResponse {
  records: BomVo[];
  total: number;
  size: number;
  current: number;
  optimizeCountSql: string;
  searchCount: string;
}