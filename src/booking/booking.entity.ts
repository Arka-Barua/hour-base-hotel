import { User } from './../user/user.entity';
import { Payment } from './../payment/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BookingStatus } from './booking.status.enum';

@Entity()
export class Booking {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  roomNumber: number;

  @Column()
  paymentStatus: boolean;

  @OneToOne(() => Payment, (payment) => payment.booking)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

// id, userid, check-in, check-out, roomNumber, status, paymentStatus.
