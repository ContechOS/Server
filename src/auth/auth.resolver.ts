import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'currentUser' })
  @UseGuards(JwtAuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => Auth)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
