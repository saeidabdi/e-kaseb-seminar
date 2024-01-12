import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { EmployeeService } from '../../employee/employee.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private employeeService: EmployeeService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret, // باید این کلید را به کلید خود تغییر دهید
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.employeeService.findOneByUsername(payload.national_code);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
