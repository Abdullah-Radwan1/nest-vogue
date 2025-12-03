import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto) {
    return this.OrdersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.OrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.OrdersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto) {
    return this.OrdersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.OrdersService.remove(+id);
  }
}
