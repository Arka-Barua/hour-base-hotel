import { BookingEntity } from './../booking/booking.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  type: string;

  @OneToOne(() => BookingEntity, (bookingEntity) => bookingEntity.payment)
  booking: BookingEntity;
}

// id, bookingId, user, amount, date, type.
