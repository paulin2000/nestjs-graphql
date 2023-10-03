import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(email: UserEntity["email"]): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: [{ email }] });
  }
  async getUserById(id: UserEntity["id"]): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: [{ id }] });
  }

  async createUser(input: UserCreateInput): Promise<UserCreateOutput> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(input.password, salt);
    const user: any = this.userRepository.create(input);
    user.password = hash;
    await user.save();
    return {
      user,
    };
  }
  // async signup(user: SignupDto): Promise<UserEntity> {
  //   const salt = await bcrypt.genSalt();
  //   const hash = await bcrypt.hash(user.password, salt);
  //   const reqBody = {
  //       fullname: user.fullname,
  //       email: user.email,
  //       password: hash
  //   }
  //   return await this.userRepository.save(reqBody)
  // }

  // async AllUsers(): Promise<UserEntity[]>{
  //   return await this.userRepository.find()
  // }
}
