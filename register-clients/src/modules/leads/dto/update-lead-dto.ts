import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsString,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsArray,
  IsUppercase,
} from 'class-validator';
import { USER_FILE_STATUS } from '../enums/user-file-status';

class Address {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  zipcode?: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ maxLength: 2 })
  @IsString()
  @MaxLength(2)
  @IsUppercase()
  @IsOptional()
  uf?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  district?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  complement?: string;
}

class Documents {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ enum: USER_FILE_STATUS })
  @IsEnum(USER_FILE_STATUS)
  @IsOptional()
  status: string;
}

class Associate {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  socialName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  monthlyIncome?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pepLevel?: string;
}

class RegisterStatus {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  date: string;
}

export class UpdateLeadDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  companySize?: string;

  @ApiPropertyOptional()
  @IsOptional()
  annualRevenue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fantasyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  biometricDocument?: string;

  @ApiPropertyOptional({ type: [Documents] })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  documents?: Documents[];

  @ApiPropertyOptional({ type: [Address] })
  @IsOptional()
  @ValidateNested()
  @IsArray()
  address?: Address[];

  @ApiPropertyOptional({ type: [Associate] })
  @IsOptional()
  @ValidateNested()
  @IsArray()
  associate?: Associate[];

  @ApiPropertyOptional()
  @IsOptional()
  registerStatus?: string;

  @ApiPropertyOptional({ type: [RegisterStatus] })
  @IsOptional()
  @ValidateNested()
  @IsArray()
  registerStatusHistory?: RegisterStatus[];
}
