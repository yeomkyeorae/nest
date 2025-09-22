import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { UsersModel } from 'src/users/entities/users.entity';

@Controller('posts') // 첫 인자는 기존 path에 접두어 붙이는 역할
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // 모든 post 가져오기
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GEP /posts/:id
  // id에 해당하는 post 가져오기
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  // post 생성
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    @User() user: UsersModel,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const authorId = user.id;

    return this.postsService.createPost(authorId, title, content);
  }

  // 4) PUT /posts/:id
  // id에 해당하는 post 변경
  @Put(':id')
  putPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(id, title, content);
  }

  // 5) DELETE /posts/:d
  // id에 해댕하는 post 삭제
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
