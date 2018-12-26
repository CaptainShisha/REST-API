import { Menu } from './Menu';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';

@Entity({
    name: 'orders',
  })
export class Order {

    @PrimaryGeneratedColumn()
    order_id: number;

    @ManyToOne (type => User, user => user.id, {eager: true})
    user_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: string;
}
