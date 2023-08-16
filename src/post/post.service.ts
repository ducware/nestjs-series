import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './dto/post.interface';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ResponseData } from 'src/global/responseData';
import { StatusCode } from 'src/global/statusCodeEnum';

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPost() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find((p) => p.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto) {
    const newPost = { id: ++this.lastPostId, ...post };
    this.posts.push(newPost);
    return new ResponseData<Post>(
      newPost,
      StatusCode.SUCCESS,
      'Post create successfully',
    );
  }

  updatePost(id: number, post: UpdatePostDto) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const updatedPost = { ...this.posts[index], ...post };
    this.posts[index] = updatedPost;
    // return updatedPost;
    return new ResponseData<Post>(
      updatedPost,
      StatusCode.SUCCESS,
      'Post update successfully',
    );
  }

  deletePost(id: number) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index > -1) {
      this.posts.splice(index, 1);
      return new ResponseData<string>(
        StatusCode.SUCCESS,
        'Post delete successfully',
      );
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
