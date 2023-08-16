/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoy } from 'src/repositories/base.repository';
import { User } from './../models/user.model';

@Injectable()
export class UserRepository extends BaseRepositoy<User> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
