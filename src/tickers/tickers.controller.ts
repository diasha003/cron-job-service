import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Info } from '@prisma/client';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('tickers')
@Controller('tickers')
export class TickersController {
  constructor(private readonly tickersService: TickersService) {}

  // @Get('/all')
  // getAllTickers() {
  //   return this.tickersService.getAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/latest-prices')
  @ApiBearerAuth('JWT')
  async getTickersLatestPrices(): Promise<Info[]> {
    return this.tickersService.getTickersLatestPrices();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-history/:fromCurrency')
  @ApiBearerAuth('JWT')
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
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<Info[]> {
    return this.tickersService.getHistoryPriceTicker(
      fromCurrency,
      fromDate,
      toDate,
    );
  }
}
