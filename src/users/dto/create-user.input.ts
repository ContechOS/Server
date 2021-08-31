import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(Config.PASSWORD_MIN_LENGTH)
  password: string;
}
