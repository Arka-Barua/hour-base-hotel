import { CategoryEntity } from './../category/category.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomNumber: number;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.rooms)
  category: CategoryEntity;
}

// id, category, number, status, bookings[].
