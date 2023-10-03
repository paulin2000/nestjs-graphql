import { IsEmpty, IsString } from "class-validator";

export class SignupDto {
  @IsEmpty()
  @IsString()
  fullname: string

  @IsEmpty()
  @IsString()
  email: string

  @IsEmpty()
  @IsString()
  password: string
}