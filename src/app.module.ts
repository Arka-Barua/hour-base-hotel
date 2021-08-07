import { CategoryController } from './category/category.controller';
import { BookingController } from './booking/booking.controller';
import { CategoryModule } from './category/category.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';
import { RoomController } from './room/room.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentController } from './payment/payment.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RoomModule,
    PaymentModule,
    BookingModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    RoomController,
    PaymentController,
    BookingController,
    CategoryController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
