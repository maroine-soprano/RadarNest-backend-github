import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MinLength } from 'class-validator';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  _id: string;

  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @Prop({ required: true })
  username: string;

  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @Prop({ required: true })
  password: string;

  @Prop()
  approved: boolean = false;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
