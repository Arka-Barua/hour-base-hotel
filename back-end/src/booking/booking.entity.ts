import { CategoryEntity } from './../category/category.entity';
import { UserEntity } from './../user/user.entity';
import { PaymentEntity } from './../payment/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './booking.status.enum';

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @OneToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.bookings)
  category: CategoryEntity;

  @Column()
  paymentStatus: boolean;

  @OneToOne(() => PaymentEntity, (paymentEntity) => paymentEntity.booking)
  @JoinColumn()
  payment: PaymentEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.bookings)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

// id, userid, check-in, check-out, roomNumber, status, paymentStatus.
