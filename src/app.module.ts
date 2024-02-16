import { Module } from '@nestjs/common';
import { TickersModule } from './tickers/tickers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TickersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
