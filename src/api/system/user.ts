import service from "@/utils/request.ts";
import type {UserInfo} from "@/types/system/user.ts";

export function getCurrentUser() {
  return service.get<UserInfo>('system/user/current')
}
