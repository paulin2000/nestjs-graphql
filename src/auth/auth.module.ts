import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/user.model';
import { AuthMutationResolver } from './resolvers/auth.mutations.resolver';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, JwtService, AuthMutationResolver],
  exports:[AuthService]
})
export class AuthModule {}
