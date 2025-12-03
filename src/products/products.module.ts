import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

import { PrismaModule } from '../prisma/prisma.module';
import { ProductsController } from './product.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [PrismaModule],
})
export class ProductsModule {}
