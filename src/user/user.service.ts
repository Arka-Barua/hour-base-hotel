import { RegisterUserDto } from './user.dto';
import { AuthService } from './../auth/auth.service';
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
    const savedUser = await this.userRepository.save(newUser);
    const { id, name } = savedUser;
    return { id, name };
  }

  // async login(user: any): Promise<any> {
  //   return this.authService.login(user);
  // }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ id });
  }
  // async login(@Request() req): Promise<any> {
  //   return {
  //     userId: req.user.id,
  //     token: this.authService.generateJWT(req.user),
  //   };
  // }

  // async login(user: LoginUserDto): Promise<any> {
  //   const { id, email } = await this.userRepository.findOne(user.email);
  //   const reqUser = { id, email };
  //   return this.authService.login(reqUser);
  // }
  // async login(user: LoginUserDto): Promise<any> {
  //   const loginUser = await this.validateUser(user.email, user.password);
  //   if (loginUser) {
  //     return this.authService.generateJWT(loginUser.id);
  //   } else {
  //     return 'Invalid Credentials';
  //   }
  // }

  // findByName(email: string): Promise<UserEntity> {
  //   return this.userRepository.findOne({ user. });
  // }
}
