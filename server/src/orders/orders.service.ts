import { Menu } from './../entity/Menu';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { OrderDTO } from 'src/models/order.DTO';
import { OrderDetails } from 'src/entity/OrderDetails';

@Injectable()
export class OrdersService {
constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private readonly detailsRepository: Repository<OrderDetails>) { }

async getAllOrders() {
        return await this.ordersRepository.find({order: {
            order_id: 'DESC' },
        });
      }
async registerOrder(order: OrderDTO) {
    // check that user exists!
    // check that product exists!
    // => TRANSACTION ? :(

    await this.ordersRepository.create(order);
    const result: any = await this.ordersRepository.save(order);
    order.items.forEach(async orderedItem => {
        const orderdetails = {order_id: result.order_id, product_id: orderedItem.product_id, quantity: orderedItem.product_quantity };

        await this.detailsRepository.create(orderdetails);
        await this.detailsRepository.save(orderdetails);
    });
    return result;
  }
}
