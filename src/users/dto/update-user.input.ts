import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(Config.PASSWORD_MIN_LENGTH)
  @IsOptional()
  password?: string;
}
