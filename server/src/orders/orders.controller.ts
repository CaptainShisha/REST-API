import { RolesGuard } from './../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, ValidationPipe, Req, HttpException, HttpStatus, Delete, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from 'src/models/order.DTO';
import { OrderItemDTO } from 'src/models/order-item.DTO';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @UseGuards(AuthGuard(), RolesGuard)
    @Get()
    async getOrders(){
        return await this.ordersService.getAllOrders();
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @Get (':order_id')
    async getOrder(@Param('order_id') param: string) {
        try {
        const currentOrder = await this.ordersService.getOrderById(param);
        return currentOrder;
        } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard())
    @Post()
    async postOrder(@Body(new ValidationPipe ({
        transform: true,
        whitelist: true,
      })) order: OrderDTO,
                    @Req() req){
          const userId = req.user.id;
          try {
            const orderCreated = await this.ordersService.registerOrder(userId, order);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @Delete (':order_id')
    async deleteOrder(@Param('order_id') param: string) {
        try {
        const deletedOrder = await this.ordersService.deleteOrder(param);
        } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
