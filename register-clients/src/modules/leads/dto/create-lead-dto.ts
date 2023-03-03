import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsUppercase,
  IsDate,
  IsDateString,
} from 'class-validator';

class Address {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  zipcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ maxLength: 2 })
  @IsString()
  @MaxLength(2)
  @IsUppercase()
  @IsOptional()
  uf?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  complement?: string;
}

class Documents {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  status: string;
}

class Associate {
  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  socialName: string;

  @ApiProperty()
  @IsString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  motherName: string;

  @ApiProperty()
  @IsString()
  occupation: string;

  @ApiProperty()
  @IsString()
  monthlyIncome: string;

  @ApiProperty()
  @IsString()
  pepLevel: string;

  @ApiProperty({ type: [Address] })
  @ValidateNested()
  address?: Address[];
}

class RegisterStatus {
  @ApiProperty()
  @IsString()
  status: string;

  //TODO: isso preferencialmente seria do tipo date, não string pura
  @ApiProperty()
  @IsString()
  date: string;
}

export class CreateLeadDTO {
  @ApiProperty()
  @IsNumberString()
  cnpj: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  legalNature: string;

  @ApiProperty()
  @IsString()
  companySize?: string;

  @ApiProperty()
  @IsString()
  annualRevenue: string;

  @ApiProperty()
  @IsString()
  legalName: string;

  @ApiProperty()
  @IsString()
  fantasyName: string;

  @ApiProperty()
  @IsString()
  biometricDocument: string;

  @ApiProperty({ type: [Documents] })
  @ValidateNested()
  documents: Documents[];

  @ApiProperty({ type: [Address] })
  @ValidateNested()
  address?: Address[];

  @ApiProperty({ type: [Associate] })
  @ValidateNested()
  associate: Associate[];

  @ApiProperty()
  @IsString()
  registerStatus: string;

  @ApiProperty({ type: [RegisterStatus] })
  @ValidateNested()
  registerStatusHistory: RegisterStatus[];
}
