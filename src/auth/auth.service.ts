import { UserEntity } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJWT(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Promise<any | boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }
}
