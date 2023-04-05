import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoffeeEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, unknown>;
}
