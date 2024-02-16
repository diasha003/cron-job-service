import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Info } from '@prisma/client';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TickersService } from './tickers.service';
import { InfoDto } from './dto/info.dto';
import { HistoryDto } from './dto/history.dto';

@ApiTags('tickers')
@Controller('tickers')
@ApiBearerAuth('JWT')
export class TickersController {
  constructor(private readonly tickersService: TickersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/latest-prices')
  async getTickersLatestPrices(): Promise<InfoDto[]> {
    return this.tickersService.getTickersLatestPrices();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-history/:fromCurrency/:toCurrency')
  @ApiParam({
    name: 'fromDate',
    required: false,
    description: 'Date format: YYYY-ММ-DDThh:mmZ',
  })
  @ApiParam({
    name: 'toDate',
    required: false,
    description: 'Date format: YYYY-ММ-DDThh:mmZ',
  })
  getHistoryPriceTicker(
    @Param('fromCurrency') fromCurrency: string,
    @Param('toCurrency') toCurrency: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<HistoryDto> {
    return this.tickersService.getHistoryPriceTicker(
      fromCurrency,
      toCurrency,
      fromDate,
      toDate,
    );
  }
}
