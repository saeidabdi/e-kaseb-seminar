import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty({ required: true })
  national_code: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  mobile: string;

  @ApiProperty({ required: true })
  password: string;
}
