import { User } from './../entity/User';
import { Menu } from './../entity/Menu';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity/Order';
import { Repository, In, getConnection } from 'typeorm';
import { OrderDTO } from 'src/models/order.DTO';
import { OrderDetails } from 'src/entity/OrderDetails';
import { OrderItemDTO } from 'src/models/order-item.DTO';

@Injectable()
export class OrdersService {
constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private readonly detailsRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>) { }

async getAllOrders() {
        return await this.ordersRepository.find({order: {
            order_id: 'DESC' },
        });
      }
async registerOrder(userId: number, order: OrderDTO) {
    let total = 0;
    const userFound = await this.usersRepository.findOne({ where: { id: userId} });
    const productIds = order.items.map(product => product.product_id);
    const productsFound = await this.menuRepository.find({ where: { product_id: In ([productIds])},
        order: {product_id: 'ASC'} });
    if (!userFound) {
        throw new Error ('User does not exist');
    } else if (productsFound.length !== productIds.length) {
        throw new Error ('Product does not exist');
    } else {
        const newOrder = new Order();
        newOrder.user_id = userId;
        const prices = productsFound.map(i => i.product_price);
        await this.ordersRepository.create(newOrder);
        const result: any = await this.ordersRepository.save(newOrder);
        order.items.sort((a, b) => a.product_id - b.product_id);
        order.items.forEach(async (orderedItem, i) => {
            const orderdetails = {order_id: result.order_id, product_id: orderedItem.product_id, quantity: orderedItem.product_quantity };
            total += (prices[i] * (+orderedItem.product_quantity));
            await this.detailsRepository.create(orderdetails);
            await this.detailsRepository.save(orderdetails);
        });
        newOrder.total = total;
        await this.ordersRepository.update({order_id: newOrder.order_id}, {total});
        return result;
        }
    }
    async getOrderById(searchOrder: string) {
        const orderFound = await this.ordersRepository.findOne({ where: { order_id: searchOrder } });
        if (!orderFound) {
          throw new Error('No such order!');
        }
        return orderFound;
      }
    async deleteOrder(searchOrder: string) {
        const orderFound = await this.getOrderById(searchOrder);
        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where('order_id = :id', { id: searchOrder })
        .execute();
      }

}
