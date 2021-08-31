import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInInput: SignInInput): Promise<User | null> {
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

    return user;
  }
}
