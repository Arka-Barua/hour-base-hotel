import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  bookingId: string;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column({ type: 'simple-array' })
  type: string[];
}

// id, bookingId, user, amount, date, type.
