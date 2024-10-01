import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';

type returnOrder = {
    id: number;
    items: {
        name: string;
        description: string;
        category: {
            name: string;
        };
        quantity: number;
    }[];
    total: number;
    status: string;
    estimatedTime?: number;
    comment: string;
    createdAt: Date;
}

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }


    @Get(':locale')
    async getOrders(@Param('locale') locale: string): Promise<returnOrder[]> {
        const orders = await this.ordersService.getOrders();

        return orders.map((order) => ({
            id: order.id,
            items: order.items.map((item) => ({
                name: locale === 'en' ? item.product.name_en : item.product.name_de,
                description: locale === 'en' ? item.product.description_en : item.product.description_de,
                category: {
                    name: locale === 'en' ? item.product.category.name_en : item.product.category.name_de,
                },
                quantity: item.quantity,
            }),
            ),
            total: order.total,
            status: order.status,
            estimatedTime: order.estimatedTime,
            comment: order.comment,
            createdAt: order.createdAt,
        }));
    }

    @Patch(':id')
    async upateOrderStatus(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.updateOrder(id, updateOrderDto.status);
    }
}
