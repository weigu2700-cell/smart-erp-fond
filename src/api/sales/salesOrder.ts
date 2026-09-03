import service from '@/utils/request'
import type {
  PageSalesOrder,
  GetPageSalesOrderQuery,
  SalesOrderVo,
  PostOrPutSalesOrder
} from '@/types/sales/salesOrder'


export function getPageSalesOrder (data:GetPageSalesOrderQuery) {
  return service.get<PageSalesOrder>(
    'sales/order',
    { params: data }
  )
}

export function getSalesOrderDetail (id:string) {
  return service.get<SalesOrderVo>(
    `sales/order/${id}`
  )
}

export function postSalesOrder (data:PostOrPutSalesOrder) {
  return service.post<SalesOrderVo>(
    'sales/order',
    data
  )
}

export function changeSalesorder (id:string,data:PostOrPutSalesOrder) {
  return service.put<SalesOrderVo>(
    `sales/order/${id}`,
    data
  )
}

export function confirmSalesOrder (id:string, data:PostOrPutSalesOrder) {
  return service.put<SalesOrderVo>(
    `sales/order/${id}/confirm`,
    data
  )
}

export function cancelSalesOrder (id:string, data:PostOrPutSalesOrder) {
  return service.put<SalesOrderVo>(
    `sales/order/${id}/cancel`, 
    data
  )
}

export function removeSalesOrder (id:string) {
  return service.del<SalesOrderVo>(
    `sales/order/${id}`
  )
}