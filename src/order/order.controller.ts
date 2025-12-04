import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.OrdersService.create(createOrderDto);
  }

  @Get(':orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.OrdersService.findOne(orderId);
  }
}
