import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  findAllByCatalog(catalogId: number): Product[] {
    return this.products.filter((product) => product.catalogId === catalogId);
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  create(data: { name: string; catalogId?: number }): Product {
    const product: Product = {
      id: this.nextId++,
      name: data.name,
      catalogId: data.catalogId ?? null,
    };
    this.products.push(product);
    return product;
  }

  update(
    id: number,
    data: { name?: string; catalogId?: number | null },
  ): Product {
    const product = this.findOne(id);
    product.name = data.name ?? product.name;
    if (data.catalogId !== undefined) {
      product.catalogId = data.catalogId;
    }
    return product;
  }

  assignToCatalog(id: number, catalogId: number): Product {
    const product = this.findOne(id);
    product.catalogId = catalogId;
    return product;
  }

  removeFromCatalog(id: number): Product {
    const product = this.findOne(id);
    product.catalogId = null;
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1)
      throw new NotFoundException(`Product with id ${id} not found`);
    this.products.splice(index, 1);
  }
}
