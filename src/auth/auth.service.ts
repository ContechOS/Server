import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  signIn(signInInput: SignInInput) {
    return 'This action adds a new auth';
  }

  signUp(signUpInput: SignUpInput) {
    return `This action returns all auth`;
  }
}
