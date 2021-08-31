import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Config } from './config/Config';
import { Neo4jConfig, Neo4jModule } from 'nest-neo4j';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        NEO4J_HOST: Joi.string().required(),
        NEO4J_PORT: Joi.number().port().required(),
        NEO4J_USER: Joi.string().required(),
        NEO4J_PASS: Joi.string().required(),
      }),
    }),
    Neo4jModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => {
        return {
          scheme: 'neo4j',
          host: configService.get('NEO4J_HOST')!,
          port: configService.get('NEO4J_PORT')!,
          username: configService.get('NEO4J_USER')!,
          password: configService.get('NEO4J_PASS')!,
        };
      },
    }),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: { expiresIn: Config.SESSION_EXPIRES_AFTER_SECONDS },
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
