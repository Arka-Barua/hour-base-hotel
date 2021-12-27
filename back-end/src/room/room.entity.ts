import { BookingEntity } from './../booking/booking.entity';
import { CategoryEntity } from './../category/category.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  roomNumber: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.rooms, {
    onDelete: 'SET NULL',
  })
  category: CategoryEntity;

  @OneToMany(() => BookingEntity, (bookingEntity) => bookingEntity.room, {
    onDelete: 'SET NULL',
  })
  bookings: BookingEntity[];
}

// id, category, number, status, bookings[].
