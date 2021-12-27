import { Auth } from 'src/auth/decorators/auth.decorator';
import { BookingService } from './booking.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Role } from 'src/user/user.role.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Auth(Role.USER)
  @Post('/create')
  async createBooking(
    @Body() body: any,
    @CurrentUser() user: any,
  ): Promise<any> {
    return this.bookingService.createBooking(body, user);
  }

  @Auth(Role.ADMIN)
  @Get()
  async getBookings(): Promise<any> {
    return this.bookingService.getBookings();
  }

  @Auth(Role.USER)
  @Get('/getbookings/user')
  async getUserBookings(@CurrentUser() user: any) {
    return this.bookingService.getUserBookings(user);
  }

  @Auth(Role.ADMIN)
  @Get('/getSinglebooking/:id')
  async getSingleBooking(@Param() { id }): Promise<any> {
    return this.bookingService.getSingleBooking(id);
  }

  @Auth(Role.ADMIN)
  @Post('/assignRoom')
  async assignRoom(@Body() body: any): Promise<any> {
    return this.bookingService.assignRoom(body);
  }

  @Auth(Role.ADMIN)
  @Get('/roomSearch/:id')
  async roomSearch(@Param() { id }): Promise<any> {
    return this.bookingService.roomSearch(id);
  }
}
