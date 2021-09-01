import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString({
    message: "name: The name must be a string",
  })
  @IsNotEmpty({
    message: "name: The name cannot be empty",
  })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsEmail(undefined, {
    message: "email: The email is not valid",
  })
  @IsNotEmpty({
    message: "email: The email cannot be empty",
  })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString({
    message: "password: The password must be a string",
  })
  @IsNotEmpty({
    message: "password: The password cannot be empty",
  })
  @MinLength(Config.PASSWORD_MIN_LENGTH, {
    message: `password: The password must be at least ${Config.PASSWORD_MIN_LENGTH} characters long`,
  })
  @IsOptional()
  password?: string;
}
