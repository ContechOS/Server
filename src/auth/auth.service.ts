import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInInput: SignInInput): Promise<Auth> {
    const user = await this.usersService.findOneByEmail(signInInput.email);

    if (!user) {
      throw new NotFoundException([
        "email: A user with this email does not exist",
      ]);
    }

    const isPasswordCorrect = await compare(
      signInInput.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException([
        "password: The password is not correct",
      ]);
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    return new Auth({ user, token });
  }
}
