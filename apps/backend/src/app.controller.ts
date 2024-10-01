import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':locale')
  async getProducts(@Param('locale') locale: string) {
    const products = await this.appService.getProducts();
    return products.map((product) => ({
      ...product,
      name: locale === 'en' ? product.name_en : product.name_de,
      description: locale === 'en' ? product.description_en : product.description_de,
      category: {
        name: locale === 'en' ? product.category.name_en : product.category.name_de,
      }
    }));
  }
}
