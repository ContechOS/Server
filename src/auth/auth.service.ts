import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
  signIn(signInInput: SignInInput) {
    return 'This action adds a new auth';
  }
}
