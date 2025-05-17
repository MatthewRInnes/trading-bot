// Type definition for stock information
export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
}

// List of popular stocks for quick selection
export const popularStocks: StockInfo[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", price: 175.04, change: 2.5 },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", price: 338.11, change: 1.8 },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", price: 142.56, change: -0.5 },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical", price: 145.24, change: 1.2 },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology", price: 334.92, change: 3.1 },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Automotive", price: 238.45, change: -1.5 },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology", price: 481.40, change: 4.2 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", price: 172.28, change: 0.8 },
  { symbol: "V", name: "Visa Inc.", sector: "Financial Services", price: 270.83, change: 1.1 },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Retail", price: 161.33, change: -0.3 }
];

/**
 * Get stock information by symbol
 * @param symbol - Stock symbol to look up
 * @returns Stock information or undefined if not found
 */
export function getStockBySymbol(symbol: string): StockInfo | undefined {
  return popularStocks.find(stock => stock.symbol === symbol);
} 