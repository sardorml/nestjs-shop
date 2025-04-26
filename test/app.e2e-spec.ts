import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/catalogs (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/catalogs')
      .send({ name: 'Test Catalog' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Catalog');
  });

  it('/catalogs (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/catalogs').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
