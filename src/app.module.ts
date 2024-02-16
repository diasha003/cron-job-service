import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickersModule } from './tickers/tickers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TickersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
