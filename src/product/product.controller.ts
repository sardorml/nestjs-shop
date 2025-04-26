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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productService.update(+id, updateProductDto);
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
