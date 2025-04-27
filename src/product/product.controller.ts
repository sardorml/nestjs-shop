import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('catalogId', ParseIntPipe) catalogId?: number): Product[] {
    if (catalogId) {
      return this.productService.findAllByCatalog(catalogId);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productService.update(id, updateProductDto);
  }

  @Put(':id/assign/:catalogId')
  assignToCatalog(
    @Param('id', ParseIntPipe) id: number,
    @Param('catalogId', ParseIntPipe) catalogId: number,
  ): Product {
    return this.productService.assignToCatalog(id, catalogId);
  }

  @Put(':id/remove-catalog')
  removeFromCatalog(@Param('id', ParseIntPipe) id: number): Product {
    return this.productService.removeFromCatalog(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.productService.remove(id);
  }
}
