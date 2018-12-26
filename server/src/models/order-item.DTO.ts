import { IsNumberString } from 'class-validator';

export class OrderItemDTO {
    @IsNumberString()
    product_id: number;

    @IsNumberString()
    product_quantity: number;
}