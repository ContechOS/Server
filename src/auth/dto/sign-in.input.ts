import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(Config.PASSWORD_MIN_LENGTH)
  password: string;
}