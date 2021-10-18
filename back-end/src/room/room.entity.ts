import { CategoryEntity } from './../category/category.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}

// id, category, number, status, bookings[].
