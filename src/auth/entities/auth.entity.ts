import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field()
  user: User;

  @Field()
  token: string;

  constructor(data: Auth) {
    Object.assign(this, {
      user: data.user,
      token: data.token,
    });
  }
}
