export interface DataFilter {
  order: string;
  per_page: number;
  page: number;
  symbol?: string;
  name?: string;
  market_cap?: number;
}
