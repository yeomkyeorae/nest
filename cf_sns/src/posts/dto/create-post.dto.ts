import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({
    message: '제목은 문자열이어야 합니다.',
  })
  title: string;

  @IsString({
    message: '내용은 문자열이어야 합니다.',
  })
  content: string;
}
