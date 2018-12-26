import { Menu } from './Menu';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { OrderDetails } from './OrderDetails';

@Entity({
    name: 'orders',
  })
export class Order {

    @PrimaryGeneratedColumn()
    @OneToMany (type => OrderDetails, details => details.order_id, {eager: true})
    order_id: number;

    @ManyToOne (type => User, user => user.id, {eager: true})
    user_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: string;
}
