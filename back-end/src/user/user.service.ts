import { RegisterUserDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async registerUser(user: RegisterUserDto): Promise<any> {
    const passwordHash = await this.authService.hashPassword(user.password);
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = passwordHash;
    newUser.mobile = user.mobile;
    const savedUser = await this.userRepository.save(newUser);
    const { id, name } = savedUser;
    return { id, name };
  }

  async getProfile(user: any): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.findOne(user.email);
    return rest;
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ id });
  }
}
