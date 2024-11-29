import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entity로 테이블을 생성한다.
@Entity()
export class PostsModel {
  //자동 primary 컬럼
  @PrimaryGeneratedColumn()
  id: number;

  // Column로 테이블 컬럼을 생성한다.
  // 1) UserModel과 연동한다. foreign key를 이용해서
  // 2) null이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
