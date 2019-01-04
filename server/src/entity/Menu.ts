import { ProductTypes } from './producttypes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetails } from './OrderDetails';

@Entity({
    name: 'menu',
  })
export class Menu {

    @PrimaryGeneratedColumn()
    @OneToMany(type => OrderDetails, order => order.product_id)
    product_id: number;

    @Column({ unique: true })
    product_name: string;

    @Column()
    product_price: number;

    @ManyToOne(type => ProductTypes, product => product.productTypeId)
    product_type: number;

    @Column()
    product_weight: number;

    @Column()
    product_description: string;

    @Column({ default: '\\images\\default.jpg'})
    image_url: string;
    @Column({ default: false})
    is_deleted: boolean;

}
