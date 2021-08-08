import { AuthModule } from './../auth/auth.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
