import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Catalog } from './catalog.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  findAll(): Catalog[] {
    return this.catalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Catalog {
    return this.catalogService.findOne(id);
  }

  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto): Catalog {
    return this.catalogService.create(createCatalogDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ): Catalog {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.catalogService.remove(id);
  }
}
