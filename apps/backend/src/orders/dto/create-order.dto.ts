import { OrderStatus } from "@prisma/client";

export class CreateOrderDto {
  items: {
    productId: number;
    quantity: number;
  }[];
  total: number;
  comment: string;
}

export class UpdateOrderDto {
  status: OrderStatus;
}