import type { PageResult } from "../common";

export interface SalesDeliveryVo {
  id: number;
  deliveryNo: string;
  salesOrderId: number;
  salesOrderNo: string;
  customerId: number;
  customerName: string;
  deliveryDate: string;
  status: string;
  items: SalesDeliveryItemVo[];
  remark: string;
}

export interface SalesDeliveryItemVo {
  id: number;
  deliveryId: number;
  lineNo: number;
  salesOrderItemId: number;
  materialId: number;
  materialName: string;
  materialCode: string;
  warehouseId: number;
  warehouseName: string;
  quantity: number;
}

export interface PageSalesDelivery extends PageResult<SalesDeliveryVo> {}

export interface GetPageSalesDelivery {
  pageNum: number;
  pageSize: number;
  deliveryNo: string;
  salesOrderId: number;
  customerId: number;
  status: string;
}

export interface PostSaleDeliveryItem {
  salesOrderItemId: number;
  quantity: number;
}

export interface PostSaleDelivery {
  salesOrderId: number;
  deliveryDate: string;
  items: PostSaleDeliveryItem[];
  remark: string;
}