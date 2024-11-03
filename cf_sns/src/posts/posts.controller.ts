import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
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
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  // 4) PUT /posts/:id
  // id에 해당하는 post 변경
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (post.id === +id ? post : prevPost));

    return post;
  }

  // 5) DELETE /posts/:d
  // id에 해댕하는 post 삭제
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +id);
    return id;
  }
}
