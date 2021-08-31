import { ObjectType, Field, HideField, ID } from '@nestjs/graphql';
import { DateTime } from 'neo4j-driver';
import { Utilities } from 'src/utilities/Utilities';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(data: User) {
    Object.assign(this, {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: Utilities.neo4jDateTimeToDateObject(data.createdAt as unknown as DateTime),
      updatedAt: Utilities.neo4jDateTimeToDateObject(data.updatedAt as unknown as DateTime),
    });
  }
}
