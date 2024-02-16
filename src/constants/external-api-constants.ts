export class ExternalApiConstants {
  private static readonly baseUrl = 'https://api.kucoin.com/api';
  public static readonly allTickers = `${this.baseUrl}/v1/market/allTickers`;
}
