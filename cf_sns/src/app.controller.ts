import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('post') // 첫 인자는 기존 path에 접두어 붙이는 역할
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 첫 인자는 접두어 붙이는 역할
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
