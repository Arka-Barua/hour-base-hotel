import { CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Controller, Post, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/user.role.enum';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('/create')
  @Auth(Role.ADMIN)
  async createRoom(@Body() body: CreateRoomDto): Promise<any> {
    return this.roomService.createRoom(body);
  }
}
