import { Room } from './../room/room.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'simple-array' })
  services: string[];

  @Column()
  price: number;

  @Column()
  maxPeople: number;

  @OneToMany(() => Room, (room) => room.category)
  rooms: Room[];
  // @Column({type: ''} )
  // rooms: Room[];
}
