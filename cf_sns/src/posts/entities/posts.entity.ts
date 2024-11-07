import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entity로 테이블을 생성한다.
@Entity()
export class PostsModel {
  //자동 primary 컬럼
  @PrimaryGeneratedColumn()
  id: number;

  // Column로 테이블 컬럼을 생성한다.
  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
