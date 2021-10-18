import { CategoryModule } from './../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]),
    forwardRef(() => CategoryModule),
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
