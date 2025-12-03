import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto) {
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

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
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

  async getUserOrdersWithCount(userId: string, take: number, skip: number) {
    const [orders, totalCount] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: { userId },
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return { orders, totalCount };
  }
  update(id: number, updateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
