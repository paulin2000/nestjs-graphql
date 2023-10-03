import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from '../../user/models/user.model';

@ObjectType()
export class AuthLoginOutput {
  @Field(()=>String)
  accessToken: string

  @Field(() => UserEntity)
  user:Partial<UserEntity>
}

