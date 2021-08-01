import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  categoryId: number;

  @Column()
  roomNumber: number;

  @Column()
  status: string;

  // @Column()
  // bookings: Booking[];
}

// id, category, number, status, bookings[].
