import { RoomEntity } from './room.entity';
import { CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/user.role.enum';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @Auth(Role.ADMIN)
  async getAllRooms(): Promise<RoomEntity[]> {
    return this.roomService.findAllRooms();
  }

  @Post('/create')
  @Auth(Role.ADMIN)
  async createRoom(@Body() body: CreateRoomDto): Promise<any> {
    return this.roomService.createRoom(body);
  }

  @Patch('/edit/:id')
  @Auth(Role.ADMIN)
  async editRoom(@Param() { id }, @Body() body: CreateRoomDto): Promise<any> {
    return this.roomService.editRoom(id, body);
  }

  @Delete('/delete/:id')
  @Auth(Role.ADMIN)
  async deleteRoom(@Param() { id }): Promise<RoomEntity> {
    return this.roomService.deleteRoom(id);
  }
}
