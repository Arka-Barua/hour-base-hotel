import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { RoomModule } from '../room/room.module';

@Module({
  providers: [CategoryService],
  imports: [RoomModule],
})
export class CategoryModule {}
