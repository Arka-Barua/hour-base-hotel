import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  // @Column({type: ''} )
  // rooms: Room[];
}
