import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInInput: SignInInput): Promise<Auth | null> {
    const user = await this.usersService.findOneByEmail(signInInput.email);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await compare(
      signInInput.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    return new Auth({ user, token });
  }

  async signUp(createUserInput: CreateUserInput): Promise<Auth | null> {
    await this.usersService.create(createUserInput);

    return this.signIn({
      email: createUserInput.email,
      password: createUserInput.password,
    });
  }
}
