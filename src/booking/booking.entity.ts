import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BookingStatus } from './booking.status.enum';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  userId: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  roomNumber: number;

  @Column()
  paymentStatus: boolean;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

// id, userid, check-in, check-out, roomNumber, status, paymentStatus.
