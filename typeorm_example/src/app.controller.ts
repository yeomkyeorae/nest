import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import {
  // ILike,
  // LessThan,
  // Between,
  // Equal,
  // ILike,
  // In,
  // IsNull,
  // LessThan,
  // LessThanOrEqual,
  // Like,
  // MoreThan,
  // MoreThanOrEqual,
  // Not,
  Repository,
} from 'typeorm';
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

  @Post('sample')
  async sample() {
    // 모델에 해당하는 객체 생성 - 저장을 안함
    // const user1 = this.userRepository.create({
    //   email: 'user1@ai.com',
    // });

    // 저장
    // const user2 = this.userRepository.save({
    //   email: 'user2@ai.com',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 가져오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음!
    // const user3 = this.userRepository.preload({
    //   id: 102,
    //   email: 'user3@ai.com',
    // });

    // 삭제하기
    // this.userRepository.delete({
    //   id: 102,
    // });

    // 값을 증가시킴
    // this.userRepository.increment(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   2,
    // );

    // 값을 감소시킴
    // this.userRepository.decrement(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   4,
    // );

    // 개수 카운팅
    // const count = this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // 합계
    // const sum = this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });

    // 평균
    // const average = this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최솟값
    // const min = this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최댓값
    // const max = this.userRepository.maximum('count', {
    //   id: LessThan(10),
    // });

    // this.userRepository.find({})

    // this.userRepository.findOne({
    //   where: {
    //     id: 2,
    //   },
    // });

    // 페이지네이션에 활용
    const usersAndCount = await this.userRepository.findAndCount({
      take: 20,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@koke.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
      where: {
        // id: Not(2), // 아닌 경우에 가져오기
        // id: LessThan(10), // 보다 작은 경우에
        // id: LessThanOrEqual(20), // 보다 작거나 같은 경우에
        // id: MoreThan(50), // 보다 많은 경우에
        // id: MoreThanOrEqual(30), // 보다 많거나 같은 경우에
        // id: Equal(30), // 같은 경우에
        // email: Like('%KOKE%'), // 유사값
        // email: ILike('%KOKE%'), // 유사값: 대문자, 소문자 구분 없이
        // id: Between(10, 15), // 사이 값
        // id: In([1, 3, 5, 7, 9]), // 해당 되는 여러 가지 값
        // id: IsNull(), // null인 경우
      },

      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // select를 정의하면 정의된 프로퍼티들만 가져온다
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // 필터링할 조건을 입력
      // {}로 묶이면 and
      // or로 지정할 경우 [{}, {}, ...]
      // where: [
      // {
      //   id: 5,
      // },
      // {
      //   version: 1,
      // },
      // {
      //   profile: { id: 3 },
      // },
      // ],
      // 관계를 가져오는 법
      // relations: {
      //   profile: true,
      // },
      // 오름차 내림차
      // ASC, DESC
      // order: {
      //   id: 'DESC',
      // },
      // 처음 몇개를 제외할지
      // skip: 0,
      // 몇개를 가져올지(0은 전부)
      // take: 1,
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
