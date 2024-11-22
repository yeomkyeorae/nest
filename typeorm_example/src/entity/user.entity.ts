import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // uuid 활용
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  // @Column({
  //   // 데이터베이스 인지 컬럼
  //   type: 'varchar',
  //   name: 'title', // 프로퍼티 이름으로 자동 유추
  //   // 값 길이 -> text 불가능
  //   length: 300,
  //   nullable: true,
  //   // true면 처음 저장할 때만 값 지정 가능
  //   // 이후에 값 변경 x
  //   update: false,
  //   // find()를 실행할 때 기본으로 값을 불러올지 기본은 true
  //   select: true,
  //   // 기본값
  //   default: 'defaultValue',
  //   // 해당 컬럼 값 모두 유일무이해야 함
  //   // 기본 값: false
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 업데이틑 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될 때 마다 1씩 올라간다.
  // 처음에는 값 1
  // save() 함수가 몇번 불렸는지 기억
  @VersionColumn()
  version: number;

  @Column()
  // increment: primary는 아닌데 자동 생성
  @Generated('uuid')
  addtionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    eager: false, // find() 실행할 때 마다 항상 같이 relation을 가져온다!
    cascade: true, // 저장할 때 relation을 한번에 같이 저장한다!
    nullable: false, // null이 가능한지

    // 삭제했을 때의 행동 - no action(아무 것도 안함), cascade(참조하는 row 같이 삭제), set null -> 참조하는 row에서 참조 id를 null로 변경
    // set default -> 기본 세팅으로 설정(테이블 기본 세팅), restrict -> 참조하고 있는 row가 있는 경우 참조 row 삭제 불가
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
