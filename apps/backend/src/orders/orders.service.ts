import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async createOrder(createOrderDto: CreateOrderDto) {
    const { items, total, comment } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        total,
        status: 'Accepted',
        comment,
        items: {
          create: items.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log("Order created: ", order);

    return order;
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              }
            },
          },
        },
      },
    });
  }

  async updateOrder(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });
  }
}
