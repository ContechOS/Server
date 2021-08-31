import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

    return new Auth({
      user,
      token: randomBytes(30).toString("hex"),
    });
  }
}
