import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, AfterInsert } from 'typeorm';
import { User } from './User';
import { OrderDetails } from './OrderDetails';
import { IsOptional } from 'class-validator';

@Entity({
    name: 'orders',
  })
export class Order {

    @PrimaryGeneratedColumn()
    @OneToMany (type => OrderDetails, details => details.order_id, {eager: true})
    order_id: number;

    @ManyToOne (type => User, user => user.id, {eager: true, onDelete: 'SET NULL'})
    user_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: string;

    @Column({default: 0})
    total: number;
}
