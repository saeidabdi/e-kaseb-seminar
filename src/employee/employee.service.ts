import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }


  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
  ) {
    return await bcrypt.compare(currentPassword, userPassword);
  }

  async findOneByUsername(national_code: string): Promise<Employee | undefined> {
    return this.employeeRepository.findOne({ where: { national_code } });
  }

  async validateCredentials({
    national_code,
    password,
  }: {
    national_code: string;
    password: string;
  }): Promise<Employee> {
    const user = await this.findOneByUsername(national_code);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async create({
    national_code,
    password,
  }: {
    national_code: string;
    password: string;
  }): Promise<Employee> {
    const userInDb = await this.findOneByUsername(national_code);
    if (userInDb) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: Employee = this.employeeRepository.create({
      national_code,
      mobile: '09028545707',
      name: 'saeed',
      time_added: '324324324',
      type: 1,
      password,
    });

    await this.employeeRepository.save(user);

    return user;
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
