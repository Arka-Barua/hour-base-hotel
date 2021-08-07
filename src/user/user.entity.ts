import { Booking } from './../booking/booking.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRole } from './user.role.enum';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, length: 10 })
  mobile: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
