import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';

import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrderModule,
    PrismaModule,
    ProductsModule,
    CheckoutModule, // 👈 make sure ProductModule is imported
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
