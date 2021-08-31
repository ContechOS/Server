import { ObjectType, Field, HideField, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
