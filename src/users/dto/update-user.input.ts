import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Config } from 'src/config/Config';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(Config.PASSWORD_MIN_LENGTH)
  @IsOptional()
  password?: string;
}
