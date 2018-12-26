import { Length, IsString, IsNumberString, ValidateNested } from 'class-validator';
import { OrderItemDTO } from './order-item.DTO';
import { isObject } from 'util';
import { Type } from 'class-transformer';
export class OrderDTO {
  @IsNumberString()
  user_id: number;

  @ValidateNested()
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}