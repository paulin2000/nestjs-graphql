import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthLoginOutput } from '../dto/user-login.dto';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(()=>AuthLoginOutput)
  async userLogin(
    @Args('username') _username: string,
    // le underscore est mis parce ce n'est pas nous mais le guard qui va utiliser ces proprités
    @Args('password') _password: string,
    @Context('req') req,
  ) {
    return await this.authService.login(req.user)
  }
}
