import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchQueryInput {
  @Field()
  key: string;

  @Field()
  operator: 'equal' | 'less' | 'greater';

  @Field(() => String, { nullable: true })
  value: string | number | boolean;
}
