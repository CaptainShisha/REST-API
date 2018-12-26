import { Menu } from './Menu';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { Order } from './Order';

@Entity({
    name: 'orderdetails',
  })
export class OrderDetails {

    @PrimaryGeneratedColumn()
    details_id: number;

    @ManyToOne(type => Order, order => order.order_id)
    order_id: number;

    @ManyToOne(type => Menu, product => product.product_id, {eager: true})
    product_id: number;

    @Column()
    quantity: number;
}
