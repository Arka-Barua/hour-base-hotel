import { RoomEntity } from './../room/room.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'simple-array' })
  services: string[];

  @Column()
  price_per_hour: string;

  @Column()
  maxPeople: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @OneToMany(() => RoomEntity, (roomEntity) => roomEntity.category)
  rooms: RoomEntity[];
}
