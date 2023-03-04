import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';

export type VerificationTokenDocument = HydratedDocument<VerificationToken>;

@Schema()
export class VerificationToken {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  @Prop({ unique: true })
  uuid: string;

  @ApiResponseProperty()
  @Prop({ unique: true })
  token: string;

  @ApiResponseProperty()
  @Prop({ unique: true, index: true })
  expires: string;
}

export const VerificationTokenSchema =
  SchemaFactory.createForClass(VerificationToken);
