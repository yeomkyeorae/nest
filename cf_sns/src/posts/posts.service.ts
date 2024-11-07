import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
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

@Injectable()
export class PostsService {
  constructor(
    // PostsModel을 다룰 수 있는 Repository를 주입 -> repository를 통해서 DB와 연동하는 역할
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === postId);

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

    posts = posts.map((prevPost) => (post.id === postId ? post : prevPost));

    return post;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== postId);
    return postId;
  }
}
