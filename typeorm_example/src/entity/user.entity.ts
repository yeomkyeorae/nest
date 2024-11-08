import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // uuid 활용
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

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
}
