import { RegisterUserDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';
import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
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
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new BadRequestException({
        message: 'User with this email already exists.',
      });
    } else {
      const passwordHash = await this.authService.hashPassword(user.password);
      const newUser = new UserEntity();
      newUser.firstname = user.firstname;
      newUser.lastname = user.lastname;
      newUser.email = user.email;
      newUser.password = passwordHash;
      newUser.mobile = user.mobile;
      const savedUser = await this.userRepository.save(newUser);
      const { id, firstname, lastname, roles } = savedUser;
      return { id, firstname, lastname, roles, msg: 'User is created' };
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ['id', 'firstname', 'lastname', 'email', 'mobile', 'roles'],
    });
  }

  async getProfile(user: any): Promise<any> {
    console.log(user);

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
