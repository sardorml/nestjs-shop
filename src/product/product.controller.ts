import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('catalogId') catalogId?: string): Product[] {
    if (catalogId) {
      return this.productService.findAllByCatalog(+catalogId);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body() body: { name: string; catalogId?: number }): Product {
    return this.productService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; catalogId?: number | null },
  ): Product {
    return this.productService.update(+id, body);
  }

  @Put(':id/assign/:catalogId')
  assignToCatalog(
    @Param('id') id: string,
    @Param('catalogId') catalogId: string,
  ): Product {
    return this.productService.assignToCatalog(+id, +catalogId);
  }

  @Put(':id/remove-catalog')
  removeFromCatalog(@Param('id') id: string): Product {
    return this.productService.removeFromCatalog(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.productService.remove(+id);
  }
}
