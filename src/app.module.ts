import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Config } from './config/Config';

@Module({
  imports: [UsersModule, AuthModule, PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Config.SESSION_EXPIRES_AFTER_SECONDS },
    }),],
})
export class AppModule {}
