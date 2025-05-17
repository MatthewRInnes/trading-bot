import { StockData, SignalData } from "@/components/StockChart";
import { TradingParameters } from "@/components/TradingForm";

/**
 * Generates mock stock data and trading signals for demonstration
 * @param params - Trading parameters from form
 * @returns Object containing stock data and signals
 */
export function analyzeStock(params: TradingParameters): { stockData: StockData; signals: SignalData[] } {
  // Generate mock price data
  const prices = Array.from({ length: 100 }, (_, i) => {
    const basePrice = 100 + Math.random() * 50;
    return {
      date: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).toISOString(),
      price: basePrice,
      volume: Math.floor(Math.random() * 1000000),
      maFast: params.showMA ? basePrice + Math.random() * 5 : undefined,
      maSlow: params.showMA ? basePrice + Math.random() * 10 : undefined
    };
  });

  // Generate mock signals
  const signals: SignalData[] = [
    {
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      signal: "BUY",
      price: 120,
      reason: "RSI oversold"
    },
    {
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      signal: "SELL",
      price: 140,
      reason: "Moving average crossover"
    }
  ];

  // Calculate current price and change
  const currentPrice = prices[prices.length - 1].price;
  const previousPrice = prices[prices.length - 2].price;
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  return {
    stockData: {
      symbol: params.symbol,
      prices,
      currentPrice,
      change,
      changePercent,
      rsi: params.showRSI ? Array.from({ length: 100 }, (_, i) => ({
        date: prices[i].date,
        value: 30 + Math.random() * 40
      })) : [],
      ma: params.showMA ? {
        fast: Array.from({ length: 100 }, (_, i) => ({
          date: prices[i].date,
          value: prices[i].price + Math.random() * 5
        })),
        slow: Array.from({ length: 100 }, (_, i) => ({
          date: prices[i].date,
          value: prices[i].price + Math.random() * 10
        }))
      } : null
    },
    signals
  };
} 