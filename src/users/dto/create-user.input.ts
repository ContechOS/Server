import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({
    message: "name: The name must be a string",
  })
  @IsNotEmpty({
    message: "name: The name cannot be empty",
  })
  name: string;

  @Field()
  @IsEmail(undefined, {
    message: "email: The email is not valid",
  })
  @IsNotEmpty({
    message: "email: The email cannot be empty",
  })
  email: string;

  @Field()
  @IsString({
    message: "password: The password must be a string",
  })
  @IsNotEmpty({
    message: "password: The password cannot be empty",
  })
  @MinLength(Config.PASSWORD_MIN_LENGTH, {
    message: `password: The password must be at least ${Config.PASSWORD_MIN_LENGTH} characters long`,
  })
  password: string;
}
