import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({
    name: 'menu',
  })
export class Menu {

    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ unique: true })
    product_name: string;

    @Column({ default: 0 })
    product_price: number;

    @Column({ default: 1 })
    product_type: number;

    @Column({ default: 0 })
    product_weight: number;

    @Column()
    product_description: string;

}
