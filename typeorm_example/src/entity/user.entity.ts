import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';

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

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  profile: ProfileModel;
}
