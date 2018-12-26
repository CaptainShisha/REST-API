import { IsEmail } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Order } from './Order';

@Entity({
    name: 'users',
  })
export class User {

    @PrimaryGeneratedColumn()
    @OneToMany(type => Order, order => order.user_id)
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    firstName: string;
    @Column()
    lastName: string;

    @Column()
    streetName: string;

    @Column()
    streetNumber: string;

    @Column()
    phoneNumber: string;

    @Column({ default: false })
    isAdmin: boolean;

}
