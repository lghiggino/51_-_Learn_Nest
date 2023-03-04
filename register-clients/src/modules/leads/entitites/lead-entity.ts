import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';

export type LeadDocument = HydratedDocument<Lead>;

class Address {
  @ApiResponseProperty()
  @Prop({ default: null })
  zipcode?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  country?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  city?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  uf: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  street?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  number?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  district?: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  complement?: string;
}

class Documents {
  @ApiResponseProperty()
  @Prop({ default: null })
  name: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  status: string;
}

class RegisterStatus {
  @ApiResponseProperty()
  @Prop({ default: null })
  status: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  date: string;
}

class Associate {
  @ApiResponseProperty()
  @Prop({ default: null })
  cpf: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  fullName: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  socialName: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  birthDate: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  phone: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  motherName: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  occupation: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  monthlyIncome: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  pepLevel: string;

  @ApiResponseProperty({ type: [Address] })
  @Prop({
    type: Array,
    default: [],
    validate: (value: Address[]) => value.length <= 2,
  })
  address: Address[];
}

@Schema()
export class Lead {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  @Prop({ unique: true })
  cnpj: string;

  @ApiResponseProperty()
  @Prop({ unique: true, index: true })
  email: string;

  @ApiResponseProperty()
  @Prop()
  legalNature: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  companySize: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  annualRevenue: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  legalName: string;

  @ApiResponseProperty()
  @Prop({ default: null })
  fantasyName: string;

  @ApiResponseProperty()
  @Prop({ unique: true, index: true, default: null })
  biometricDocument: string;

  @ApiResponseProperty({ type: [Documents] })
  @Prop({ type: Array, default: [] })
  documents: Documents[];

  @ApiResponseProperty({ type: [Address] })
  @Prop({
    type: Array,
    default: [],
    validate: (value: Address[]) => value.length <= 2,
  })
  address: Address[];

  @ApiResponseProperty({ type: [Associate] })
  @Prop({ type: Array, default: [] })
  associate: Associate[];

  @ApiResponseProperty()
  @Prop({ default: null })
  registerStatus: string;

  @ApiResponseProperty({ type: [RegisterStatus] })
  @Prop({ type: Array, default: [] })
  registerStatusHistory: RegisterStatus[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
