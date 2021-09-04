import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../auth/decorators/current-user.decorator';
import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { RegisterUserDto } from './user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  register(@Body() body: RegisterUserDto): Promise<any> {
    return this.userService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@CurrentUser() user): Promise<any> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@CurrentUser() user): Promise<any> {
    return this.userService.getProfile(user);
  }
}
