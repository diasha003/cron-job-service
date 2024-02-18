import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { ExternalApiConstants } from 'src/constants/external-api-constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickerApiResponse } from './dto/tickerApiResponse.dto';
import { timeStamp } from 'console';

@Injectable()
export class TickersJobs {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async saveExternalDataJob() {
    const { data } = await firstValueFrom(
      this.httpService.get<TickerApiResponse>(ExternalApiConstants.allTickers),
    );

    const timestamp = new Date(data.data.time);
    const tickersData = data.data.ticker.map((item) => {
      const [fromCurrency, toCurrency] = item.symbol.split('-');
      return {
        fromCurrency,
        toCurrency,
        buy: Number(item.buy),
        sell: Number(item.sell),
        timestamp,
      };
    });

    await this.prisma.info.createMany({
      data: tickersData,
    });
    //console.log('inserted');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async cleanupDatabaseJob() {
    const lastAddData = await this.prisma.info.groupBy({
      by: ['timestamp'],
      _count: {
        timestamp: true,
      },
      orderBy: {
        _count: {
          timestamp: 'desc',
        },
      },
      skip: 2,
    });

    const timestampsToDelete = lastAddData.map((data) => data.timestamp);

    await this.prisma.info.deleteMany({
      where: {
        timestamp: {
          in: timestampsToDelete,
        },
      },
    });
    //console.log('delete');
  }
}
