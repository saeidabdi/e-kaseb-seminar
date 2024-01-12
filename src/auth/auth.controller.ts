import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthGuard } from '../common/guard/jwt-auth.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../common/guard/roles.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() LoginmployeeDto: LoginDto) {
    return this.authService.login(LoginmployeeDto);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  test() {
    return 'sssssssssssss';
  }
}
