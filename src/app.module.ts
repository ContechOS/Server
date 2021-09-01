import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        NEO4J_SCHEME: Joi.string().required(),
        NEO4J_HOST: Joi.string().required(),
        NEO4J_PORT: Joi.number().port().required(),
        NEO4J_USERNAME: Joi.string().required(),
        NEO4J_PASSWORD: Joi.string().required(),
        NEO4J_DATABASE: Joi.string().required(),
      }),
    }),
    Neo4jModule.fromEnv(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
