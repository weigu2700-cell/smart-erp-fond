import service from "@/utils/request.ts"
import type {MenuItem} from '@/types/system/menu.ts'

export function getCurrentUserMenu() {
  return service.get<MenuItem[]>('system/menu/current')
}
