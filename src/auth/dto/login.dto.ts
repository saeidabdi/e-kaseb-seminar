import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ required: true })
  national_code: string;
  @ApiProperty({ required: true })
  password: string;
}
