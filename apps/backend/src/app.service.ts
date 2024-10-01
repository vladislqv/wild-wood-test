import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly _prisma: PrismaService) { }

  async getProducts() {
    return this._prisma.product.findMany({
      include: {
        category: true
      }
    })
  }

}
