import { TickerDto } from './ticker.dto';

export interface TickerApiResponse {
  code: string;
  data: {
    time: Date;
    ticker: TickerDto[];
  };
}
