import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CatalogModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
