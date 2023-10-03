import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../models/user.model';
import { UserService } from '../user.service';
import { UserCreateOutput, UserCreateInput } from '../dto/user-create.dto';

@Resolver(UserEntity)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async createUser(@Args('input') input: UserCreateInput) {
    return await this.userService.createUser(input);
  }
}
