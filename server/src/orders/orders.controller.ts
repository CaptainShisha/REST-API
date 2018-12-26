import { Controller, Get, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from 'src/models/order.DTO';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // Add guards
    @Get()
    async getOrders(){
        // Join Tables with Query Builder??
        return await this.ordersService.getAllOrders();
    }

 // Add AuthG
    @Post()
    async postOrder(@Body(new ValidationPipe ({
        transform: true,
        whitelist: true,
      })) order: OrderDTO){
        return await this.ordersService.registerOrder(order);
    }
}
