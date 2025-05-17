import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import TradingForm, { TradingParameters } from "../components/TradingForm";
import StockChart, { StockData, SignalData } from "../components/StockChart";
import SignalLog from "../components/SignalLog";
import StockMarketOverview from "../components/StockMarketOverview";
import { analyzeStock } from "../lib/mockData";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getStockBySymbol, popularStocks } from "../lib/stockData";

/**
 * Main trading dashboard component
 * Displays trading form, stock chart, and market overview
 */
const Index = () => {
  // State for stock data and trading signals
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [signals, setSignals] = useState<SignalData[]>([]);
  
  // Default trading parameters
  const [parameters, setParameters] = useState<TradingParameters>({
    symbol: "AAPL",
    period: "6mo",
    showRSI: true,
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    showMA: true,
    maFast: 20,
    maSlow: 50
  });

  /**
   * Handles stock analysis when form is submitted
   * @param params - Trading parameters from form
   */
  const handleAnalyze = (params: TradingParameters) => {
    setParameters(params);
    const { stockData, signals } = analyzeStock(params);
    setStockData(stockData);
    setSignals(signals);
  };

  /**
   * Handles stock selection from market overview
   * @param symbol - Selected stock symbol
   */
  const handleSelectStock = (symbol: string) => {
    const newParams = { ...parameters, symbol };
    setParameters(newParams);
    const { stockData, signals } = analyzeStock(newParams);
    setStockData(stockData);
    setSignals(signals);
  };

  // Get current stock information
  const stockInfo = getStockBySymbol(parameters.symbol);

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      {/* Header section with title and description */}
      <div className="flex flex-col items-center justify-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-gradient">Trend Compass</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl">
          Trading bot that analyses historical price data, calculates technical indicators, and generates trading signals.
        </p>
        {stockInfo && (
          <Badge className="mt-2 bg-blue-600/20 border border-blue-500/30 text-sm px-3 py-1">
            Currently analysing: {stockInfo.name} ({parameters.symbol})
          </Badge>
        )}
      </div>

      {/* Main content card with tabs */}
      <Card className="glass-morphism mb-8 border-none">
        <CardContent className="p-1">
          <Tabs defaultValue="dashboard" className="w-full">
            {/* Tab navigation */}
            <TabsList className="grid grid-cols-2 mb-8 p-1 bg-black/30 rounded-lg">
              <TabsTrigger value="dashboard" className="text-sm md:text-base data-[state=active]:glass-morphism">Trading Dashboard</TabsTrigger>
              <TabsTrigger value="signals" className="text-sm md:text-base data-[state=active]:glass-morphism">Signal Analysis</TabsTrigger>
            </TabsList>

            {/* Trading dashboard tab content */}
            <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: Trading form and market overview */}
                <div className="lg:col-span-1 space-y-6">
                  <TradingForm onSubmit={handleAnalyze} />
                  <StockMarketOverview 
                    stocks={popularStocks}
                    onStockSelect={handleSelectStock}
                  />
                </div>
                {/* Right column: Stock chart */}
                <div className="lg:col-span-2">
                  <StockChart 
                    stockData={stockData} 
                    signals={signals}
                    parameters={parameters}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Signal analysis tab content */}
            <TabsContent value="signals" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column: Signal log */}
                <div>
                  <SignalLog signals={signals} />
                </div>
                {/* Right column: Stock chart */}
                <div>
                  <StockChart 
                    stockData={stockData} 
                    signals={signals}
                    parameters={parameters}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
