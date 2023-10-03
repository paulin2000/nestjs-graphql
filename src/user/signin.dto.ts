import { IsEmpty, IsString } from "class-validator";

export class SigninDto{
  @IsEmpty()
  @IsString()
  email: string

  @IsEmpty()
  @IsString()
  password: string
}