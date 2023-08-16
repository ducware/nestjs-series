import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    // check exist
    const userInDb = await this.userRepository.findByCondition({
      email: user.email,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(user);

    return newUser;
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findByCondition({
      email: email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isEqual = bcrypt.compareSync(password, user.password);

    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email) {
    return await this.userRepository.findByCondition({
      email: email,
    });
  }
}
