/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoy } from 'src/repositories/base.repository';
import { Post } from './models/post.model';
import { Model } from 'mongoose';

@Injectable()
export class PostRepository extends BaseRepositoy<Post> {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    super(postModel);
  }
}
