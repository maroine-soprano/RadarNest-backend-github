import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Parameters, ParametersSchema } from './parameters';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  user_id: string;

  @Field(() => Number)
  @Prop()
  timestamp: number;

  @Field(() => Parameters)
  @Prop({ type: ParametersSchema })
  parameters: Parameters;
}

export const UserSchema = SchemaFactory.createForClass(User);
