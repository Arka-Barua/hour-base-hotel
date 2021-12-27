import { BookingStatus } from './booking.status.enum';
import { RoomService } from './../room/room.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository, getManager } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    @Inject(forwardRef(() => RoomService))
    private roomService: RoomService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createBooking(body: any, user: any): Promise<any> {
    const {
      checkIn,
      checkOut,
      category,
      noOfPeople,
      stayDuration,
      totalPrice,
    } = body;
    const selectedCategory = await this.categoryService.findCategoryById(
      category,
    );
    const currentUser = await this.userService.findById(user.userId);
    const newBooking = new BookingEntity();
    newBooking.checkIn = checkIn;
    newBooking.checkOut = checkOut;
    newBooking.noOfPeople = noOfPeople;
    newBooking.category = selectedCategory;
    newBooking.totalPrice = totalPrice;
    newBooking.stayDuration = stayDuration;
    newBooking.user = currentUser;
    return this.bookingRepository.save(newBooking);
  }

  async getBookings(): Promise<any> {
    return this.bookingRepository.find({
      relations: ['category', 'room'],
      order: { status: 'ASC' },
    });
  }

  async getUserBookings(user: any): Promise<any> {
    const currentUser = await this.userService.findById(user.userId);
    return this.bookingRepository.find({
      select: [
        'checkIn',
        'checkOut',
        'id',
        'status',
        'totalPrice',
        'stayDuration',
      ],
      where: { user: currentUser },
      relations: ['category'],
    });
  }

  async getSingleBooking(id: string): Promise<any> {
    return this.bookingRepository.find({
      where: { id },
      relations: ['user', 'category'],
    });
  }

  async assignRoom(body: any): Promise<any> {
    const { roomId, id } = body;
    console.log(roomId, id);
    const availableRoom = await this.roomService.getRoomById(roomId);
    const selectedBooking = await this.bookingRepository.findOne(id);
    selectedBooking.room = availableRoom;
    selectedBooking.status = BookingStatus.BOOKED;
    return this.bookingRepository.save(selectedBooking);
  }

  async roomSearch(id: string): Promise<any> {
    const entityManager = getManager();
    const selectedBooking = await entityManager.query(
      `SELECT * FROM booking_entity be where "be".id = $1`,
      [id],
    );
    console.log(selectedBooking);
    console.log(selectedBooking[0].categoryId);
    return entityManager.query(
      `
      SELECT "re"."roomNumber", "re"."id" 
      FROM room_entity re 
      JOIN category_entity ce
      ON "re"."categoryId" = "ce"."id"
      WHERE "ce"."id" = $1 AND
      "re"."roomNumber" NOT IN
      (SELECT "re"."roomNumber"
      from booking_entity be
      join room_entity re
      ON "be"."roomId" = "re"."id"
        WHERE
          ($2 BETWEEN "be"."checkIn" AND "be"."checkOut") OR
          ($3 BETWEEN "be"."checkIn" AND "be"."checkOut") OR
          ($2 < "be"."checkIn" AND $3 > "be"."checkOut") OR
          ($2 > "be"."checkIn" AND $3 < "be"."checkOut")
      );
    `,
      [
        selectedBooking[0].categoryId,
        selectedBooking[0].checkIn,
        selectedBooking[0].checkOut,
      ],
    );
  }
}
