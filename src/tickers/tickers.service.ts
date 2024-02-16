import { HttpService } from '@nestjs/axios';
import { Info } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { InfoDto } from './dto/info.dto';
import { HistoryDto, HistoryItemDto } from './dto/history.dto';

@Injectable()
export class TickersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getTickersLatestPrices(): Promise<InfoDto[]> {
    const allTickers = await this.prisma.info.findMany({
      distinct: ['fromCurrency', 'toCurrency'],
      orderBy: {
        timestamp: 'desc',
      },
      select: {
        id: false,
        buy: true,
        fromCurrency: true,
        sell: true,
        timestamp: true,
        toCurrency: true,
      },
    });

    return allTickers;
  }

  async getHistoryPriceTicker(
    fromCurrency: string,
    toCurrency: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<HistoryDto> {
    const info = await this.prisma.info.findMany({
      where: {
        fromCurrency,
        toCurrency,
        timestamp: {
          gte: fromDate ? new Date(fromDate) : undefined,
          lte: toDate ? new Date(toDate) : undefined,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
      select: {
        id: false,
        buy: true,
        fromCurrency: true,
        sell: true,
        timestamp: true,
        toCurrency: true,
      },
    });

    const historyItems: HistoryItemDto[] = info.map((x) => ({
      buy: x.buy.toNumber(),
      sell: x.sell.toNumber(),
      timestamp: x.timestamp,
    }));

    return {
      fromCurrency,
      toCurrency,
      history: historyItems,
    };
  }
}
