import service from "@/utils/request.ts"
import type {
  TransactionListRequest,
  TransactionListResponse
} from "@/types/inventory/transaction.ts";

export function getTransactionList(data: TransactionListRequest) {
  return service.get<TransactionListResponse>('inventory/transaction', {params: data})
}
