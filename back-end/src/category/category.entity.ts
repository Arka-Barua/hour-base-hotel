import { RoomEntity } from './../room/room.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'simple-array' })
  services: string[];

  @Column()
  price_per_hour: number;

  @Column()
  maxPeople: number;

  @Column({ type: 'simple-array', nullable: false })
  images: string[];

  @OneToMany(() => RoomEntity, (roomEntity) => roomEntity.category, {
    onDelete: 'CASCADE',
  })
  rooms: RoomEntity[];
}
