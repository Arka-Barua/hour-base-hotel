import { Booking } from './../booking/booking.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  type: string;

  @OneToOne(() => Booking, (booking) => booking.payment)
  booking: Booking;
}

// id, bookingId, user, amount, date, type.
