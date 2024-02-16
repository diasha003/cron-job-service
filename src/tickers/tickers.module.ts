import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TickersController } from './tickers.controller';
import { TickersJobs } from './tickers.job';
import { TickersService } from './tickers.service';

@Module({
  controllers: [TickersController],
  providers: [TickersService, TickersJobs, PrismaService],
  imports: [HttpModule, ScheduleModule.forRoot(), AuthModule],
})
export class TickersModule {}
