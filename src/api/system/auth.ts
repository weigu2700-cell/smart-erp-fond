import service from '@/utils/request'
import type {loginRequest,loginResponse} from "@/types/system/auth.ts";

function Login(
  data: loginRequest
): Promise<loginResponse> {
  return service.post<loginResponse>('/auth/login', data)
}

export default Login
