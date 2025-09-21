import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({}),
    // 모델에 대한 repository 주입
    TypeOrmModule.forFeature([PostsModel, UsersModel]),
  ],
  controllers: [PostsController],
  providers: [AuthService, PostsService, UsersService],
})
export class PostsModule {}
