import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersController } from './tickers.controller';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TickersController],
  providers: [TickersService, PrismaService],
  imports: [HttpModule, ScheduleModule.forRoot(), AuthModule],
})
export class TickersModule {}
