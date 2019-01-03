import { ManyToOne } from 'typeorm';
import { Menu } from './Menu';
import { Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producttypes')
export class ProductTypes {
    @PrimaryGeneratedColumn()
    @OneToMany(type => Menu, menu => menu.product_type)
    productTypeId: number;

    @Column()
    producttype: string;

}
