import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataModule } from './data/data.module';
import { ProductsModule } from './products/products.module';
import { InventoriesModule } from './inventories/inventories.module';


@Module({
  imports: [PrismaModule, AuthModule, TransactionsModule, ConfigModule.forRoot({isGlobal: true}), DataModule, ProductsModule, InventoriesModule],
  controllers: [],
})
export class AppModule {}
