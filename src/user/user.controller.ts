import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  register(@Body() body: RegisterUserDto) {
    return this.userService.registerUser(body);
  }
}
