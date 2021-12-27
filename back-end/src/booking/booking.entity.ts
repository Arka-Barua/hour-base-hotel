import { RoomEntity } from './../room/room.entity';
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

  @Column({ type: 'timestamptz' })
  checkIn: Date;

  @Column({ type: 'timestamptz' })
  checkOut: Date;

  @Column()
  noOfPeople: string;

  @Column()
  totalPrice: number;

  @Column()
  stayDuration: number;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.bookings)
  category: CategoryEntity;

  @ManyToOne(() => RoomEntity, (roomEntity) => roomEntity.bookings, {
    nullable: true,
  })
  room: RoomEntity;

  @Column({ nullable: true })
  paymentStatus: boolean;

  @OneToOne(() => PaymentEntity, (paymentEntity) => paymentEntity.booking, {
    nullable: true,
  })
  @JoinColumn()
  payment: PaymentEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.bookings, {
    onDelete: 'NO ACTION',
    lazy: true,
  })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

// id, userid, check-in, check-out, roomNumber, status, paymentStatus.
