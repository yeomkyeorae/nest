import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  /**
   * 만드는 기능
   *
   * 1) registerWithEmail
   *  - email, pwd를 입력 받아 사용자 생성
   *  - 완료되면 accessToken, refreshToken 반환
   *  - 회원가입 후 다시 로그인 방지 로직 추가
   *
   * 2) loginWithEmail
   * - email, pwd를 입력하면 사용자 검증 진행
   * - 완료되면 accessToken, refreshToken 반환
   *
   * 3) loginUser
   * - (1), (2)에서 필요한 accessToken, refreshToken을 반환하는 로직
   *
   * 4) signToken
   * - (3)에서 필요한 accessToken, refreshToken을 sign하는 로직
   *
   * 5) authenticateWithEmailAndPassword
   * - (2)에서 로그인 진행할 때 필요한 기본적은 검증 진행
   *  1. 사용자가 존재하는지 확인
   *  2. 비밀번호가 맞는지 확인
   *  3. 모두 통과되면 사용자 정보 반환
   *  4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 반환
   */
}
