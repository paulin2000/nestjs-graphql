import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolvers';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService,UserMutationsResolver],
  exports:[UserService]
})
export class UserModule {}
