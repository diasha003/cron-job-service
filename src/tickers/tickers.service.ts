import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TickerApiResponse } from './dto/tickerApiResponse.dto';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { Info } from '@prisma/client';

@Injectable()
export class TickersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron('0 * * * * *')
  async getAll() {
    const { data } = await firstValueFrom(
      this.httpService.get<TickerApiResponse>(
        'https://api.kucoin.com/api/v1/market/allTickers',
      ),
    );

    const tickersData = data.data.ticker.map((item) => ({
      fromCurrency: item.symbol.split('-')[0],
      toCurrency: item.symbol.split('-')[1],
      buy: Number(item.buy),
      sell: Number(item.sell),
      timestamp: new Date(data.data.time),
    }));

    // await this.prisma.info.createMany({
    //   data: tickersData,
    // });

    console.log('insert');

    return tickersData;
  }

  async getTickersLatestPrices(): Promise<Info[]> {
    const allTickers = await this.prisma.info.findMany({
      distinct: ['fromCurrency', 'toCurrency'],
      orderBy: {
        timestamp: 'desc',
      },
    });

    return allTickers;
  }

  async getHistoryPriceTicker(
    fromCurrency: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<Info[]> {
    const info = await this.prisma.info.findMany({
      where: {
        fromCurrency,
        timestamp: {
          gte: fromDate ? new Date(fromDate) : undefined,
          lte: toDate ? new Date(toDate) : undefined,
        },
      },
    });

    return info;
  }
}
