import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { TradingParameters } from "./TradingForm";
import { Info } from "lucide-react";
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProps } from 'recharts';

interface StockChartProps {
  stockData: StockData | null;
  signals: SignalData[];
  parameters: TradingParameters;
}

export interface StockData {
  prices: { date: string; price: number; volume: number; maFast?: number; maSlow?: number }[];
  rsi?: { date: string; value: number }[];
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export interface SignalData {
  date: string;
  signal: "BUY" | "SELL" | "HOLD";
  price: number;
  reason: string;
}

/**
 * StockChart Component
 * Displays interactive charts for stock price data, RSI, and moving averages
 * Includes trading signals and detailed tooltips for data points
 */
const StockChart = ({ stockData, signals, parameters }: StockChartProps) => {
  // Reference for the chart container
  const chartRef = useRef<HTMLDivElement>(null);
  // State to track which chart type is currently active
  const [activeTab, setActiveTab] = useState<"price" | "rsi">("price");

  // Display a message when no stock data is available
  if (!stockData) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-background-secondary animate-fade-in">
        <CardContent className="flex items-center gap-2">
          <Info className="text-muted-foreground animate-pulse" />
          <p className="text-text-secondary">Enter a stock symbol and click 'Analyse Stock' to view charts</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare chart data by combining price data with trading signals
  const chartData = stockData.prices.map((item, index) => {
    const signal = signals.find(s => s.date === item.date);
    return {
      date: item.date,
      price: item.price,
      maFast: item.maFast,
      maSlow: item.maSlow,
      signal: signal ? signal.signal : null,
    };
  });

  // Get the most recent trading signal
  const latestSignal = signals.length > 0 ? signals[signals.length - 1] : null;

  /**
   * Custom tooltip component for the chart
   * Displays detailed information when hovering over data points
   */
  const CustomTooltip = ({ active, payload, label }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {(payload as Array<{ name?: string; value?: number | string; color?: string }>).map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : String(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Main stock information card */}
      <Card className="w-full bg-background-secondary border-none shadow-md transition-all duration-300 hover:shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            {/* Stock symbol and information tooltip */}
            <CardTitle className="text-2xl text-text-primary flex items-center gap-2">
              {stockData.symbol}
              <TooltipProvider>
                <ShadcnTooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-text-muted hover:text-primary transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Detailed stock performance summary
                  </TooltipContent>
                </ShadcnTooltip>
              </TooltipProvider>
            </CardTitle>
            {/* Current price and change display */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-text-primary">${stockData.currentPrice.toFixed(2)}</span>
              <span 
                className={`text-sm font-medium transition-colors ${
                  stockData.change >= 0 
                    ? "text-trading-buy animate-pulse" 
                    : "text-trading-sell animate-pulse"
                }`}
              >
                {stockData.change >= 0 ? "+" : ""}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {/* Latest trading signal badge */}
          {latestSignal && (
            <Badge 
              className={`px-4 py-2 text-lg font-bold transition-all duration-300 hover:scale-105 ${
                latestSignal.signal === "BUY" 
                ? "bg-trading-buy text-white hover:bg-trading-buy/80" 
                : latestSignal.signal === "SELL" 
                ? "bg-trading-sell text-white hover:bg-trading-sell/80" 
                : "bg-trading-hold text-white hover:bg-trading-hold/80"
              }`}
            >
              {latestSignal.signal}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {/* Chart type selection tabs */}
          <div className="flex space-x-2 mb-4">
            <Badge 
              variant={activeTab === "price" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTab("price")}
            >
              Price
            </Badge>
            {parameters.showRSI && (
              <Badge 
                variant={activeTab === "rsi" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveTab("rsi")}
              >
                RSI
              </Badge>
            )}
          </div>

          {/* Main price chart */}
          <div className="h-[400px] bg-trading-chartbg rounded-lg overflow-hidden" ref={chartRef}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                {/* Chart grid and axes */}
                <CartesianGrid strokeDasharray="3 3" stroke="var(--trading-gridline)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: "var(--text-secondary)" }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: "var(--text-secondary)" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Price and moving average lines */}
                {activeTab === "price" ? (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="var(--trading-line)" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    {parameters.showMA && (
                      <>
                        <Line 
                          type="monotone" 
                          dataKey="maFast" 
                          stroke="#22d3ee" 
                          strokeWidth={1.5}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="maSlow" 
                          stroke="#f43f5e" 
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey="rsi" 
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {/* Trading signal markers */}
                {signals.map((signal, i) => {
                  const dataPoint = chartData.find(d => d.date === signal.date);
                  if (!dataPoint) return null;
                  
                  const index = chartData.indexOf(dataPoint);
                  
                  return (
                    <svg key={i}>
                      {signal.signal === "BUY" && (
                        <circle
                          cx={0}
                          cy={0}
                          r={6}
                          fill="var(--trading-buy)"
                          className="recharts-dot"
                          data-index={index}
                          data-payload={JSON.stringify(dataPoint)}
                        />
                      )}
                      {signal.signal === "SELL" && (
                        <circle
                          cx={0}
                          cy={0}
                          r={6}
                          fill="var(--trading-sell)"
                          className="recharts-dot"
                          data-index={index}
                          data-payload={JSON.stringify(dataPoint)}
                        />
                      )}
                    </svg>
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* RSI chart (if enabled) */}
      {parameters.showRSI && stockData.rsi && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>RSI ({parameters.rsiPeriod})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stockData.rsi}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  {/* RSI chart grid and axes */}
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--trading-gridline)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: "var(--muted-foreground)" }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)" }}
                    ticks={[0, parameters.rsiOversold, 50, parameters.rsiOverbought, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)", 
                      borderColor: "var(--border)",
                      color: "var(--card-foreground)"
                    }}
                    formatter={(value: number | string) => [`${value}`, 'RSI']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#c026d3" 
                    strokeWidth={2}
                    dot={false}
                  />
                  {/* RSI threshold lines */}
                  <svg>
                    <line
                      x1="0%"
                      y1={`${100 - parameters.rsiOverbought}%`}
                      x2="100%"
                      y2={`${100 - parameters.rsiOverbought}%`}
                      stroke="#f43f5e"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="0%"
                      y1={`${100 - parameters.rsiOversold}%`}
                      x2="100%"
                      y2={`${100 - parameters.rsiOversold}%`}
                      stroke="#22d3ee"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="0%"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="var(--muted-foreground)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Latest signals section */}
      {signals.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Latest Signals</h3>
          <ScrollArea className="h-[150px]">
            <div className="space-y-2">
              {signals.slice(-3).reverse().map((signal, index) => (
                <div 
                  key={index} 
                  className="p-2 border rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {new Date(signal.date).toLocaleDateString()}
                    </span>
                    <Badge className={`${
                      signal.signal === "BUY" 
                        ? "bg-trading-buy hover:bg-trading-buy/80" 
                        : signal.signal === "SELL" 
                        ? "bg-trading-sell hover:bg-trading-sell/80" 
                        : "bg-trading-hold hover:bg-trading-hold/80"
                    }`}>
                      {signal.signal}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {signal.reason}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default StockChart;
