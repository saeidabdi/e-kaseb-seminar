import { Role } from "../../common/enum/role.enum";

export interface JwtPayload {
  sub: number;
  national_code: string;
  mobile: string;
  first_name: string;
  role?: Role
}
