import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // select를 정의하면 정의된 프로퍼티들만 가져온다
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        version: true,
        profile: {
          id: true,
        },
      },
      // 필터링할 조건을 입력
      // {}로 묶이면 and
      // or로 지정할 경우 [{}, {}, ...]
      where: [
        // {
        //   id: 5,
        // },
        // {
        //   version: 1,
        // },
        // {
        //   profile: { id: 3 },
        // },
      ],
      // 관계를 가져오는 법
      relations: {
        profile: true,
      },
      // 오름차 내림차
      // ASC, DESC
      order: {
        id: 'DESC',
      },
      // 처음 몇개를 제외할지
      skip: 0,
      // 몇개를 가져올지(0은 전부)
      take: 1,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'zxcv@koke.com',
      profile: {
        profileImg: 'zxcv.jpg',
      },
    });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@koke.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'nextjs',
    });
    const post2 = await this.postRepository.save({
      title: 'nestjs',
    });
    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });
    await this.postRepository.save({
      title: 'docker',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
