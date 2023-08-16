/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ResponseData } from 'src/global/responseData';
import { StatusCode } from 'src/global/statusCodeEnum';
import { PostRepository } from './post.repository';
import { Post } from './models/post.model';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts() {
    return await this.postRepository.getByCondition({});
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    return new ResponseData<Post>(
      newPost,
      StatusCode.SUCCESS,
      'Post created successfully',
    );
  }

  async updatePost(post_id: string, post: UpdatePostDto) {
    await this.postRepository.findByIdAndUpdate(post_id, post);
    
    return new ResponseData<string>(
      StatusCode.SUCCESS,
      'Post updated successfully',
    );
  }
  

  async deletePost(post_id: string) {
    await this.postRepository.deleteOne(post_id);

    return new ResponseData<string>(
      StatusCode.SUCCESS,
      'Post deleted successfully',
    );
  }
  
}
