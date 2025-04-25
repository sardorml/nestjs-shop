import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Catalog } from './catalog.entity';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  findAll(): Catalog[] {
    return this.catalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Catalog {
    return this.catalogService.findOne(+id);
  }

  @Post()
  create(@Body() body: { name: string }): Catalog {
    return this.catalogService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string }): Catalog {
    return this.catalogService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.catalogService.remove(+id);
  }
}
