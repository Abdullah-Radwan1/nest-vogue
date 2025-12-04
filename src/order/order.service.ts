import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto.items || !Array.isArray(createOrderDto.items)) {
      throw new Error('Order must contain items');
    }
    return this.prisma.order.create({
      data: {
        items: {
          create: createOrderDto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        totalAmount: createOrderDto.totalAmount,
      },
    });
  }

  findOne(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
  }

  findUserOrders(userId: string, take: number, skip: number) {
    return this.prisma.order.findMany({
      where: { userId },
      take,
      skip,
      orderBy: {
        createdAt: 'desc', // You can order by fields like `createdAt` if required
      },
    });
  }
}
