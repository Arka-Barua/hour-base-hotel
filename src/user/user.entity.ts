import { BookingEntity } from './../booking/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './user.role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  mobile: string;
  // ^(?:\+?88)?01[135-9]\d{8}$ bd mobile regex check
  // /^(?:\+88|88)?(01[3-9]\d{8})$/ correct regex

  @OneToMany(() => BookingEntity, (bookingEntity) => bookingEntity.user)
  bookings: BookingEntity[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  roles: Role[];
}
