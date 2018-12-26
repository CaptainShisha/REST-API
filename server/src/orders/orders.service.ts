import { Menu } from './../entity/Menu';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { OrderDTO } from 'src/models/order.DTO';

@Injectable()
export class OrdersService {
constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>) { }

async getAllOrders() {
        return await this.ordersRepository.find({order: {
            order_id: 'DESC' },
        });
      }
async registerOrder(order: OrderDTO) {
    // check that user exists!
    await this.ordersRepository.create(order);
    const result = await this.ordersRepository.save([order]);
    return result;
  }
}
