import { RoomModule } from './../room/room.module';
import { CategoryModule } from './../category/category.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    forwardRef(() => CategoryModule),
    forwardRef(() => RoomModule),
    forwardRef(() => UserModule),
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
