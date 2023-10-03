import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require("dotenv").config()

export interface JWTPayload {
  id:string
  email: string
  firstName: string
  lastName: string
  avatar: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    
    const {id, email, firstName, lastName, avatar} = payload
    return {id, email, firstName, lastName, avatar};
  }
  
}

