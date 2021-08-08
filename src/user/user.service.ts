import { RegisterUserDto } from './user.dto';
import { AuthService } from './../auth/auth.service';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async registerUser(user: RegisterUserDto): Promise<any> {
    const passwordHash = await this.authService.hashPassword(user.password);
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = passwordHash;
    const savedUser = await this.userRepository.save(newUser);
    const { password, mobile, ...rest } = savedUser;
    return rest;
  }
}
