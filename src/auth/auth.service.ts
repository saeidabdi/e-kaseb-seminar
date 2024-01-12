import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) { }

  /**
   * login method
   * @param {LoginDto} params
   * @returns 
   */
  async login({ national_code, password }: LoginDto) {
    const user = await this.employeeService.validateCredentials({
      national_code,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      national_code: user.national_code,
      mobile: user.mobile,
      first_name: user.name,
      role: user.type
    };

    return {
      access_token: await this.jwtService.signAsync(payload,
        {
          secret: process.env.secret,
          expiresIn: process.env.expiresIn
        }
      ),
    };
  }

  // async signUp(username: string, pass: string) {
  //     const user = await this.usersService.create({
  //         username,
  //         password: pass,
  //     });
  //     if (!user) {
  //         throw new InternalServerErrorException();
  //     }
  //     delete user.password;
  //     return user;
  // }
}
