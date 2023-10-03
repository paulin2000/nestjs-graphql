
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private  readonly userService: UserService,
    private readonly jwt: JwtService,
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user) {
        const { password, ...result } = user;
        if (bcrypt.compare(password, pass)) {
            return {
                user: result
            };
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
  }

  async login(user: JWTPayload) {
    const payload = { id:user.id ,email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar };
    
    return {
      accessToken: await this.jwt.sign(payload,{secret:process.env.SECRET,expiresIn:'1h'}),
    };
  }
}