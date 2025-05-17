// Interface for stock information
export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  volume?: number;
}

// Helper function to generate random price and change
const generateStockData = (basePrice: number = 100) => {
  const price = basePrice + (Math.random() * 200 - 100);
  const change = (Math.random() * 10 - 5);
  return { price, change };
};

// List of popular stocks with their sectors
export const popularStocks: StockInfo[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", ...generateStockData(150) },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", ...generateStockData(300) },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", ...generateStockData(2500) },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical", ...generateStockData(3500) },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology", ...generateStockData(300) },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Automotive", ...generateStockData(200) },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", ...generateStockData(150) },
  { symbol: "V", name: "Visa Inc.", sector: "Financial Services", ...generateStockData(250) },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive", ...generateStockData(150) },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", ...generateStockData(160) },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer Defensive", ...generateStockData(150) },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial Services", ...generateStockData(400) },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare", ...generateStockData(500) },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer Cyclical", ...generateStockData(350) },
  { symbol: "BAC", name: "Bank of America Corp.", sector: "Financial Services", ...generateStockData(35) },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", ...generateStockData(30) },
  { symbol: "DIS", name: "The Walt Disney Co.", sector: "Communication Services", ...generateStockData(100) },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication Services", ...generateStockData(500) },
  { symbol: "INTC", name: "Intel Corporation", sector: "Technology", ...generateStockData(45) },
  // Additional UK and global stocks
  { symbol: "HSBA.L", name: "HSBC Holdings plc", sector: "Financial Services", ...generateStockData(600) },
  { symbol: "BP.L", name: "BP plc", sector: "Energy", ...generateStockData(500) },
  { symbol: "VOD.L", name: "Vodafone Group plc", sector: "Communication Services", ...generateStockData(100) },
  { symbol: "GSK.L", name: "GSK plc", sector: "Healthcare", ...generateStockData(1500) },
  { symbol: "ULVR.L", name: "Unilever plc", sector: "Consumer Defensive", ...generateStockData(4000) },
  { symbol: "SHEL.L", name: "Shell plc", sector: "Energy", ...generateStockData(2500) },
  { symbol: "LLOY.L", name: "Lloyds Banking Group plc", sector: "Financial Services", ...generateStockData(50) },
  { symbol: "RIO.L", name: "Rio Tinto plc", sector: "Basic Materials", ...generateStockData(5000) },
  { symbol: "BARC.L", name: "Barclays plc", sector: "Financial Services", ...generateStockData(150) },
  { symbol: "AZN.L", name: "AstraZeneca plc", sector: "Healthcare", ...generateStockData(10000) },
  // Global tech stocks
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", ...generateStockData(500) },
  { symbol: "CRM", name: "Salesforce, Inc.", sector: "Technology", ...generateStockData(200) },
  { symbol: "CSCO", name: "Cisco Systems, Inc.", sector: "Technology", ...generateStockData(50) },
  { symbol: "IBM", name: "International Business Machines Corp.", sector: "Technology", ...generateStockData(150) },
  { symbol: "ORCL", name: "Oracle Corporation", sector: "Technology", ...generateStockData(100) },
  // Global financial stocks
  { symbol: "C", name: "Citigroup Inc.", sector: "Financial Services", ...generateStockData(50) },
  { symbol: "GS", name: "Goldman Sachs Group Inc.", sector: "Financial Services", ...generateStockData(350) },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial Services", ...generateStockData(90) },
  { symbol: "AXP", name: "American Express Company", sector: "Financial Services", ...generateStockData(180) },
  // Global consumer stocks
  { symbol: "KO", name: "The Coca-Cola Company", sector: "Consumer Defensive", ...generateStockData(60) },
  { symbol: "PEP", name: "PepsiCo, Inc.", sector: "Consumer Defensive", ...generateStockData(170) },
  { symbol: "MCD", name: "McDonald's Corporation", sector: "Consumer Cyclical", ...generateStockData(280) },
  { symbol: "NKE", name: "Nike, Inc.", sector: "Consumer Cyclical", ...generateStockData(100) },
  { symbol: "SBUX", name: "Starbucks Corporation", sector: "Consumer Cyclical", ...generateStockData(100) },
  // Healthcare stocks
  { symbol: "MRK", name: "Merck & Co., Inc.", sector: "Healthcare", ...generateStockData(120) },
  { symbol: "BMY", name: "Bristol-Myers Squibb Company", sector: "Healthcare", ...generateStockData(50) },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", ...generateStockData(150) },
  { symbol: "LLY", name: "Eli Lilly and Company", sector: "Healthcare", ...generateStockData(700) },
  // Energy stocks
  { symbol: "XOM", name: "Exxon Mobil Corporation", sector: "Energy", ...generateStockData(100) },
  { symbol: "CVX", name: "Chevron Corporation", sector: "Energy", ...generateStockData(150) },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy", ...generateStockData(120) },
];

export const stockSectors = [
  "Technology",
  "Financial Services",
  "Healthcare",
  "Consumer Cyclical",
  "Communication Services",
  "Industrial",
  "Consumer Defensive",
  "Energy",
  "Basic Materials",
  "Real Estate",
  "Utilities"
];

/**
 * Retrieves stock information by symbol
 * @param symbol - Stock symbol to search for
 * @returns Stock information or undefined if not found
 */
export function getStockBySymbol(symbol: string): StockInfo | undefined {
  return popularStocks.find(stock => stock.symbol === symbol.toUpperCase());
}

/**
 * Retrieves stocks by sector
 * @param sector - Sector to filter by
 * @returns Array of stocks in the specified sector
 */
export function getStocksBySector(sector: string): StockInfo[] {
  return popularStocks.filter(stock => stock.sector === sector);
}

/**
 * Retrieves unique sectors from the stock list
 * @returns Array of unique sector names
 */
export function getUniqueSectors(): string[] {
  return [...new Set(popularStocks.map(stock => stock.sector))];
}
