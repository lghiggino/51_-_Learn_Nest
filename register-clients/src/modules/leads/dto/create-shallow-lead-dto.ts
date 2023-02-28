import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

export class CreateShallowLeadDTO {
  @ApiProperty()
  @IsNumberString()
  cnpj: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  legalNature: string;
}
