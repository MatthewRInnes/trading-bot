import { StockData, SignalData } from "@/components/StockChart";
import { TradingParameters } from "@/components/TradingForm";
import { StockInfo } from "./stockData"
import { TooltipProps } from 'recharts';

// Interface for historical price data
export interface HistoricalPrice {
  date: string
  price: number
  volume: number
}

// Interface for moving average data
export interface MovingAverage {
  date: string
  value: number
}

// Interface for trading signal data
export interface Signal {
  date: string
  type: "BUY" | "SELL" | "HOLD"
  price: number
  reason: string
}

// Generate mock historical price data
export const generateMockPriceData = (symbol: string, days: number, startPrice: number = 150): StockData => {
  const today = new Date();
  const prices = [];
  let currentPrice = startPrice;
  let volume = 1000000;
  
  // Generate random walk prices
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - i));
    const change = (Math.random() - 0.5) * 5; // Random price change
    currentPrice += change;
    volume = Math.max(100000, volume + (Math.random() - 0.5) * 500000);
    
    if (currentPrice < 1) currentPrice = 1; // Ensure price doesn't go below 1
    
    prices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.round(volume)
    });
  }
  
  // Calculate moving averages
  const maFast = 20;
  const maSlow = 50;
  
  for (let i = 0; i < prices.length; i++) {
    if (i >= maFast - 1) {
      const slice = prices.slice(i - (maFast - 1), i + 1);
      const avg = slice.reduce((sum, item) => sum + item.price, 0) / maFast;
      prices[i].maFast = parseFloat(avg.toFixed(2));
    }
    
    if (i >= maSlow - 1) {
      const slice = prices.slice(i - (maSlow - 1), i + 1);
      const avg = slice.reduce((sum, item) => sum + item.price, 0) / maSlow;
      prices[i].maSlow = parseFloat(avg.toFixed(2));
    }
  }
  
  // Calculate RSI
  const rsiPeriod = 14;
  const rsi = calculateRSI(prices.map(item => item.price), rsiPeriod);
  
  const rsiData = rsi.map((value, i) => ({
    date: prices[i + rsiPeriod].date,
    value: parseFloat(value.toFixed(2))
  }));
  
  // Last price and change calculation
  const lastPrice = prices[prices.length - 1].price;
  const prevPrice = prices[prices.length - 2].price;
  const change = lastPrice - prevPrice;
  const changePercent = (change / prevPrice) * 100;
  
  return {
    prices,
    rsi: rsiData,
    symbol,
    currentPrice: lastPrice,
    change,
    changePercent
  };
};

// Calculate the Relative Strength Index (RSI)
function calculateRSI(prices: number[], period: number = 14): number[] {
  const rsi = [];
  const gains = [];
  const losses = [];
  
  // Calculate gains and losses for each period
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }
  
  // Calculate average gains and losses for the first RSI
  let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period;
  
  // Calculate RS and RSI for each day
  for (let i = period; i < prices.length - 1; i++) {
    // For the first calculation
    if (i === period) {
      const rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss); // Avoid division by zero
      rsi.push(100 - (100 / (1 + rs)));
    } else {
      // For subsequent calculations, use smoothed averages
      avgGain = ((avgGain * (period - 1)) + gains[i - 1]) / period;
      avgLoss = ((avgLoss * (period - 1)) + losses[i - 1]) / period;
      
      const rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss);
      rsi.push(100 - (100 / (1 + rs)));
    }
  }
  
  return rsi;
}

// Generate trading signals based on indicators
export const generateSignals = (stockData: StockData, params: TradingParameters): SignalData[] => {
  const signals: SignalData[] = [];
  const prices = stockData.prices;
  const rsi = stockData.rsi || [];
  
  const getDateRSI = (date: string) => {
    const rsiPoint = rsi.find(r => r.date === date);
    return rsiPoint ? rsiPoint.value : null;
  };
  
  // Skip some days at the beginning as they won't have both MAs
  for (let i = params.maSlow; i < prices.length; i++) {
    const current = prices[i];
    const previous = prices[i - 1];
    
    if (!current.maFast || !current.maSlow || !previous.maFast || !previous.maSlow) {
      continue;
    }
    
    // MA Crossover signals
    let signal: "BUY" | "SELL" | "HOLD" = "HOLD";
    let reason = "";
    
    // Check MA crossover (if enabled)
    if (params.showMA) {
      const currentCrossState = current.maFast > current.maSlow;
      const previousCrossState = previous.maFast > previous.maSlow;
      
      if (currentCrossState && !previousCrossState) {
        // Fast MA crosses above slow MA -> BUY signal
        signal = "BUY";
        reason = `MA(${params.maFast}) crossed above MA(${params.maSlow})`;
      } else if (!currentCrossState && previousCrossState) {
        // Fast MA crosses below slow MA -> SELL signal
        signal = "SELL";
        reason = `MA(${params.maFast}) crossed below MA(${params.maSlow})`;
      }
    }
    
    // Check RSI signals (if enabled and no MA signal)
    if (params.showRSI && signal === "HOLD") {
      const currentRSI = getDateRSI(current.date);
      const previousRSI = getDateRSI(previous.date);
      
      if (currentRSI !== null && previousRSI !== null) {
        if (currentRSI < params.rsiOversold && previousRSI >= params.rsiOversold) {
          signal = "BUY";
          reason = `RSI(${params.rsiPeriod}) dropped below oversold level ${params.rsiOversold}`;
        } else if (currentRSI > params.rsiOverbought && previousRSI <= params.rsiOverbought) {
          signal = "SELL";
          reason = `RSI(${params.rsiPeriod}) rose above overbought level ${params.rsiOverbought}`;
        }
      }
    }
    
    // Add signal if not HOLD
    if (signal !== "HOLD") {
      signals.push({
        date: current.date,
        signal,
        price: current.price,
        reason
      });
    }
  }
  
  // Add some HOLD signals for variety
  for (let i = Math.floor(prices.length * 0.4); i < prices.length; i += Math.floor(prices.length / 8)) {
    if (!signals.some(s => s.date === prices[i].date)) {
      const randomReason = [
        "Market conditions stable, maintaining position.",
        "Indicators showing neutral trend.",
        "Waiting for clearer signal confirmation.",
        "Consolidation phase detected."
      ][Math.floor(Math.random() * 4)];
      
      signals.push({
        date: prices[i].date,
        signal: "HOLD",
        price: prices[i].price,
        reason: randomReason
      });
    }
  }
  
  // Sort signals by date
  return signals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to generate mock data based on parameters
export const analyzeStock = (params: TradingParameters): { stockData: StockData, signals: SignalData[] } => {
  // Convert period to days
  const periodMap: Record<string, number> = {
    "1mo": 30,
    "3mo": 90,
    "6mo": 180,
    "1y": 365,
    "2y": 730,
    "5y": 1825
  };
  
  const days = periodMap[params.period] || 180;
  
  // Generate random starting price based on the ticker symbol
  const symbolHash = params.symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const startPrice = 50 + (symbolHash % 200);
  
  // Generate mock stock data
  const stockData = generateMockPriceData(params.symbol, days, startPrice);
  
  // Update moving averages based on parameters
  recalculateMovingAverages(stockData, params.maFast, params.maSlow);
  
  // Generate signals based on parameters and indicators
  const signals = generateSignals(stockData, params);
  
  return { stockData, signals };
};

// Recalculate moving averages based on user parameters
function recalculateMovingAverages(stockData: StockData, maFast: number, maSlow: number): void {
  const prices = stockData.prices;
  
  // Reset existing MAs
  prices.forEach(p => {
    p.maFast = undefined;
    p.maSlow = undefined;
  });
  
  // Calculate new MAs
  for (let i = 0; i < prices.length; i++) {
    if (i >= maFast - 1) {
      const slice = prices.slice(i - (maFast - 1), i + 1);
      const avg = slice.reduce((sum, item) => sum + item.price, 0) / maFast;
      prices[i].maFast = parseFloat(avg.toFixed(2));
    }
    
    if (i >= maSlow - 1) {
      const slice = prices.slice(i - (maSlow - 1), i + 1);
      const avg = slice.reduce((sum, item) => sum + item.price, 0) / maSlow;
      prices[i].maSlow = parseFloat(avg.toFixed(2));
    }
  }
}

/**
 * Simulates stock performance data
 * @param stocks - Array of stock information
 * @returns Array of stocks with simulated performance data
 */
export function simulateStockPerformance(stocks: StockInfo[]): StockInfo[] {
  return stocks.map(stock => ({
    ...stock,
    change: (Math.random() - 0.5) * 10, // Random change between -5% and +5%
    volume: Math.floor(Math.random() * 1000000) + 100000 // Random volume between 100,000 and 1,100,000
  }))
}

export interface TradingParameters {
  symbol: string;
  period: string;
  showRSI: boolean;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  showMA: boolean;
  maFast: number;
  maSlow: number;
}
