import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GraphQLDeleteResult {
  @Field()
  success: boolean;

  constructor(data: GraphQLDeleteResult) {
    Object.assign(this, {
      success: data.success,
    });
  }
}
