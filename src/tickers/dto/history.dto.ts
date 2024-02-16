export interface HistoryDto {
  fromCurrency: string;
  toCurrency: string;
  history: HistoryItemDto[];
}

export interface HistoryItemDto {
  timestamp: Date;
  buy: number;
  sell: number;
}
