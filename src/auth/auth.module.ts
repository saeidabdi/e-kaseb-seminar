import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeService } from '../employee/employee.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, EmployeeService],
  controllers: [AuthController]
})
export class AuthModule { }
