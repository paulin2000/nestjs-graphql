import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserEntity } from '../models/user.model';

@ObjectType()
export class UserCreateOutput{
  @Field(()=>UserEntity)
  user: UserEntity
}

@InputType()
export class UserCreateInput{
  @Field(()=>String)
  email: string;
  
  @Field(()=>String)
  password: string;

  @Field(()=>String)
  firstName: string;
  
  @Field(()=>String)
  lastName: string;
  
  @Field(()=>String,{nullable: true})
  avatar?: string;
}