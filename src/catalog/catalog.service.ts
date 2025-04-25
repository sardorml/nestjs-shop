import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from './catalog.entity';

@Injectable()
export class CatalogService {
  private catalogs: Catalog[] = [];
  private nextId = 1;

  findAll(): Catalog[] {
    return this.catalogs;
  }

  findOne(id: number): Catalog {
    const catalog = this.catalogs.find((c) => c.id === id);
    if (!catalog)
      throw new NotFoundException(`Catalog with id ${id} not found`);
    return catalog;
  }

  create(data: { name: string }): Catalog {
    const catalog: Catalog = { id: this.nextId++, name: data.name };
    this.catalogs.push(catalog);
    return catalog;
  }

  update(id: number, data: { name?: string }): Catalog {
    const catalog = this.findOne(id);
    catalog.name = data.name ?? catalog.name;
    return catalog;
  }

  remove(id: number): void {
    const index = this.catalogs.findIndex((c) => c.id === id);
    if (index === -1)
      throw new NotFoundException(`Catalog with id ${id} not found`);
    this.catalogs.splice(index, 1);
  }
}
