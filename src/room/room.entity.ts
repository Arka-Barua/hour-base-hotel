import { Category } from './../category/category.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  roomNumber: number;

  @Column()
  status: string;

  @ManyToOne(() => Category, (category) => category.rooms)
  category: Category;
}

// id, category, number, status, bookings[].
