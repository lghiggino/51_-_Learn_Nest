import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoffeeEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, unknown>;
}
