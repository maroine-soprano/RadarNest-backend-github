import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType() // GraphQL Object Type
@Schema()
export class Parameters {
  @Field(() => String, { nullable: true })
  @Prop()
  device_type?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  is_touch_capable?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  browser?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  browser_version?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  os?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  os_version?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  device?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  device_brand?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  device_model?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  user_agent_string?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  language_code?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  language?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  language_locality?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  dimensions?: string;

  @Field(() => Number, { nullable: true })
  @Prop()
  view_area?: number;

  @Field(() => String, { nullable: true })
  @Prop()
  screen_dimensions?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  screen_area?: string;

  @Field(() => Number, { nullable: true })
  @Prop()
  view_ratio?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  height?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  width?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  screen_height?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  screen_width?: number;

  @Field(() => String, { nullable: true })
  @Prop()
  browser_vendor?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  browser_language?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  ad_blocker?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  network_speed?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  platform?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  save_data?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  screen_orientation?: string;

  @Field(() => Number, { nullable: true })
  @Prop()
  battery_level?: number;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  battery_charging?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  day_of_week?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  month?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  day_of_month?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  hour?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  season?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  is_holiday?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  holiday_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  referer_url?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  referer_domain?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  product_id?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  store_id?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  product_tag?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  utm_source?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  utm_medium?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  utm_campaign?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  utm_content?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  utm_term?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  continent?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  country?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  region?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  city?: string;

  @Field(() => Number, { nullable: true })
  @Prop()
  latitude?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  longitude?: number;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  is_eu?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  postal?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  is_capital?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  asn?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  isp?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  currency?: string;

  @Field(() => Number, { nullable: true })
  @Prop()
  currency_rate?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  elevation?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  temperature?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  humidity?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  apparent_temperature?: number;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  is_day?: boolean;

  @Field(() => Number, { nullable: true })
  @Prop()
  precipitation?: number;

  @Field(() => Number, { nullable: true })
  @Prop()
  weather_code?: number;

  @Field(() => String, { nullable: true })
  @Prop()
  timezone?: string;
}

export const ParametersSchema = SchemaFactory.createForClass(Parameters);
