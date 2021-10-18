import { UserService } from './../user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Promise<any | boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const match = await this.comparePassword(password, user.password);
    if (user && match) {
      const { id, firstname, lastname, roles } = user;
      return { id, firstname, lastname, roles };
    }
    return null;
  }

  async login(user: any) {
    const { id, firstname, lastname, roles, mobile, email } =
      await this.userService.findById(user.id);
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id, firstname, lastname, mobile, email },
      roles,
    };
  }
}
