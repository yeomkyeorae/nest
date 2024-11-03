import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: PostModel[] = [
  {
    id: 1,
    author: 'mourinho',
    title: 'this is soccer',
    content: 'do it',
    likeCount: 10000,
    commentCount: 90,
  },
  {
    id: 2,
    author: 'simeone',
    title: 'this is not soccer',
    content: 'just do it',
    likeCount: 11000,
    commentCount: 95,
  },
  {
    id: 3,
    author: 'kompany',
    title: 'this is not football',
    content: 'just do it like me',
    likeCount: 12000,
    commentCount: 92,
  },
];

@Controller('posts') // 첫 인자는 기존 path에 접두어 붙이는 역할
export class PostsController {
  constructor(private readonly appService: PostsService) {}

  // 1) GET /posts
  // 모든 post 가져오기
  @Get()
  getPosts() {
    return posts;
  }

  // 2) GEP /posts/:id
  // id에 해당하는 post 가져오기
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  // post 생성

  // 4) PUT /posts/:id
  // id에 해당하는 post 변경

  // 5) DELETE /posts/:d
  // id에 해댕하는 post 삭제
}
