import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts') // 첫 인자는 기존 path에 접두어 붙이는 역할
export class PostsController {
  constructor(private readonly appService: PostsService) {}

  @Get()
  getPost(): Post {
    return {
      author: 'yeomkyeorae',
      title: 'it is me',
      content: 'Who are you?',
      likeCount: 10,
      commentCount: 5,
    };
  }
}
