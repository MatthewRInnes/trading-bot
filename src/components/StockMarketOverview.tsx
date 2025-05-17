import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { TrendingUp, TrendingDown, Building2 } from "lucide-react";

// Define types for stock information and component props
interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
}

interface StockMarketOverviewProps {
  stocks: StockInfo[]; // Array of stocks to display
  onStockSelect: (symbol: string) => void; // Callback for stock selection
}

/**
 * StockMarketOverview Component
 * Displays a market overview with tabs for sectors, top gainers, and losers
 * Allows users to select stocks from the overview
 */
const StockMarketOverview = ({ stocks, onStockSelect }: StockMarketOverviewProps) => {
  // Group stocks by their sectors for organised display
  const stocksBySector = stocks.reduce((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = [];
    }
    acc[stock.sector].push(stock);
    return acc;
  }, {} as Record<string, StockInfo[]>);

  // Get unique sectors for tab organisation
  const sectors = Object.keys(stocksBySector);

  // Calculate top gainers and losers based on price change
  const sortedStocks = [...stocks].sort((a, b) => b.change - a.change);
  const topGainers = sortedStocks.slice(0, 5);
  const topLosers = sortedStocks.slice(-5).reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sectors">
          {/* Tab navigation for different market views */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>

          {/* Sectors tab content */}
          <TabsContent value="sectors">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {sectors.map((sector) => (
                  <div key={sector} className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {sector}
                    </h3>
                    <div className="grid gap-2">
                      {stocksBySector[sector].map((stock) => (
                        <div
                          key={stock.symbol}
                          className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-accent"
                          onClick={() => onStockSelect(stock.symbol)}
                        >
                          <div>
                            <p className="font-medium">{stock.symbol}</p>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${stock.price.toFixed(2)}</p>
                            <Badge
                              className={
                                stock.change >= 0
                                  ? "bg-trading-buy hover:bg-trading-buy/80"
                                  : "bg-trading-sell hover:bg-trading-sell/80"
                              }
                            >
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change.toFixed(2)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Top gainers tab content */}
          <TabsContent value="gainers">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {topGainers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => onStockSelect(stock.symbol)}
                  >
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${stock.price.toFixed(2)}</p>
                      <Badge className="bg-trading-buy hover:bg-trading-buy/80">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{stock.change.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Top losers tab content */}
          <TabsContent value="losers">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {topLosers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => onStockSelect(stock.symbol)}
                  >
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${stock.price.toFixed(2)}</p>
                      <Badge className="bg-trading-sell hover:bg-trading-sell/80">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {stock.change.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StockMarketOverview;
