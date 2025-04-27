import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('should create a product', () => {
    const created = service.create({ name: 'Laptop' });
    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Laptop');
  });

  it('should retrieve all products', () => {
    service.create({ name: 'Phone' });
    service.create({ name: 'Tablet' });

    const products = service.findAll();
    expect(products.length).toBeGreaterThanOrEqual(2);
  });

  it('should assign a product to a catalog', () => {
    const product = service.create({ name: 'Camera' });
    const assigned = service.assignToCatalog(product.id, 123);

    expect(assigned.catalogId).toBe(123);
  });

  it('should remove a product', () => {
    const product = service.create({ name: 'Fridge' });
    service.remove(product.id);

    expect(service.findAll().find((p) => p.id === product.id)).toBeUndefined();
  });
});
