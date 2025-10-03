import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

// Entity로 테이블을 생성한다.
@Entity()
export class PostsModel extends BaseModel {
  // Column로 테이블 컬럼을 생성한다.
  // 1) UserModel과 연동한다. foreign key를 이용해서
  // 2) null이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsString({
    message: '제목은 문자열이어야 합니다.',
  })
  title: string;

  @Column()
  @IsString({
    message: '내용은 문자열이어야 합니다.',
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
