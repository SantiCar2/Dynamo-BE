import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [PrismaModule, AuthModule, TransactionsModule, ConfigModule.forRoot({isGlobal: true}), DataModule],
})
export class AppModule {}
