import { CatalogService } from './catalog.service';
import { Catalog } from './catalog.entity';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    service = new CatalogService();
  });

  it('should create a catalog', () => {
    const created = service.create({ name: 'Electronics' });
    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Electronics');
  });

  it('should retrieve all catalogs', () => {
    service.create({ name: 'Books' });
    service.create({ name: 'Toys' });

    const catalogs = service.findAll();
    expect(catalogs.length).toBeGreaterThanOrEqual(2);
  });

  it('should update a catalog', () => {
    const created = service.create({ name: 'Old Name' });
    const updated = service.update(created.id, { name: 'New Name' });

    expect(updated.name).toBe('New Name');
  });

  it('should delete a catalog', () => {
    const created = service.create({ name: 'Temporary' });
    service.remove(created.id);

    expect(service.findAll().find((c) => c.id === created.id)).toBeUndefined();
  });
});
