import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { toast } from "../components/ui/sonner";
import { ChevronDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { popularStocks } from "../lib/stockData";

interface TradingFormProps {
  onSubmit: (values: TradingParameters) => void;
  isLoading?: boolean;
}

export interface TradingParameters {
  symbol: string;
  period: string; // e.g., '1mo', '3mo', '6mo', etc.
  showRSI: boolean;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  showMA: boolean;
  maFast: number;
  maSlow: number;
}

/**
 * TradingForm Component
 * Provides a form for configuring trading analysis parameters
 * Includes settings for RSI and Moving Average indicators
 */
const TradingForm = ({ onSubmit, isLoading = false }: TradingFormProps) => {
  // Initialise form state with default values
  const [parameters, setParameters] = useState<TradingParameters>({
    symbol: "AAPL",
    period: "6mo",
    showRSI: true,
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    showMA: true,
    maFast: 20,
    maSlow: 50,
  });

  /**
   * Handles changes to form input values
   * @param field - The field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof TradingParameters, value: string | number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Handles form submission
   * Triggers analysis with current parameters
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Analysis started for " + parameters.symbol);
    onSubmit(parameters);
  };

  /**
   * Handles quick stock selection from popular stocks
   * @param symbol - The selected stock symbol
   */
  const handleQuickSelect = (symbol: string) => {
    setParameters({
      ...parameters,
      symbol,
    });
    toast.info(`Selected ${symbol}`);
  };

  return (
    <Card className="w-full glass-morphism border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-gradient flex items-center justify-between">
          Trading Parameters
          <ChevronDown className="w-5 h-5 text-foreground/60" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Stock symbol input section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="symbol" className="text-foreground/90">Stock Symbol</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Enter stock symbol (e.g., AAPL for Apple Inc). This is a simulation using mock data.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="symbol"
              name="symbol"
              value={parameters.symbol}
              onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
              placeholder="e.g. AAPL, MSFT, GOOG"
              required
              className="bg-black/20 border-white/10 focus:border-white/30 focus:ring-white/20"
            />
            {/* Quick select buttons for popular stocks */}
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-2">Popular Stocks:</p>
              <div className="flex flex-wrap gap-2">
                {popularStocks.slice(0, 8).map((stock) => (
                  <Button 
                    key={stock.symbol}
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickSelect(stock.symbol)}
                    className="bg-black/30 border-white/10 hover:bg-white/10 text-xs px-2 py-0.5 h-auto"
                  >
                    {stock.symbol}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Time period selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="period" className="text-foreground/90">Time Period</Label>
              <span className="text-sm text-muted-foreground">{parameters.period}</span>
            </div>
            <select
              id="period"
              name="period"
              value={parameters.period}
              onChange={(e) => handleInputChange("period", e.target.value)}
              className="bg-black/20 border-white/10 focus:border-white/30 focus:ring-white/20 rounded-md p-2"
              aria-label="Select time period"
            >
              <option value="1mo">1 Month</option>
              <option value="3mo">3 Months</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
            </select>
          </div>

          {/* RSI settings section */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-medium mb-4 text-gradient">RSI Settings</h3>
            <div className="flex items-center justify-between p-2 rounded-md bg-black/10">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showRSI"
                  checked={parameters.showRSI}
                  onCheckedChange={(checked) => handleInputChange("showRSI", checked)}
                />
                <Label htmlFor="showRSI" className="text-foreground/90">Enable RSI</Label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>RSI is a momentum oscillator that measures the speed and change of price movements.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* RSI parameter controls */}
            {parameters.showRSI && (
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rsiPeriod" className="text-foreground/90">RSI Period</Label>
                    <span className="text-sm text-muted-foreground">{parameters.rsiPeriod}</span>
                  </div>
                  <Slider
                    id="rsiPeriod"
                    min={2}
                    max={50}
                    step={1}
                    value={[parameters.rsiPeriod]}
                    onValueChange={(value) => handleInputChange("rsiPeriod", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rsiOverbought" className="text-foreground/90">Overbought Level</Label>
                    <span className="text-sm text-muted-foreground">{parameters.rsiOverbought}</span>
                  </div>
                  <Slider
                    id="rsiOverbought"
                    min={50}
                    max={90}
                    step={1}
                    value={[parameters.rsiOverbought]}
                    onValueChange={(value) => handleInputChange("rsiOverbought", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rsiOversold" className="text-foreground/90">Oversold Level</Label>
                    <span className="text-sm text-muted-foreground">{parameters.rsiOversold}</span>
                  </div>
                  <Slider
                    id="rsiOversold"
                    min={10}
                    max={50}
                    step={1}
                    value={[parameters.rsiOversold]}
                    onValueChange={(value) => handleInputChange("rsiOversold", value[0])}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Moving Average settings section */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-medium mb-4 text-gradient">Moving Average Settings</h3>
            <div className="flex items-center justify-between p-2 rounded-md bg-black/10">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showMA"
                  checked={parameters.showMA}
                  onCheckedChange={(checked) => handleInputChange("showMA", checked)}
                />
                <Label htmlFor="showMA" className="text-foreground/90">Enable MA Crossover</Label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Moving averages help identify trends and potential support/resistance levels.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* MA parameter controls */}
            {parameters.showMA && (
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maFast" className="text-foreground/90">Fast MA Period</Label>
                    <span className="text-sm text-muted-foreground">{parameters.maFast}</span>
                  </div>
                  <Slider
                    id="maFast"
                    min={5}
                    max={50}
                    step={1}
                    value={[parameters.maFast]}
                    onValueChange={(value) => handleInputChange("maFast", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maSlow" className="text-foreground/90">Slow MA Period</Label>
                    <span className="text-sm text-muted-foreground">{parameters.maSlow}</span>
                  </div>
                  <Slider
                    id="maSlow"
                    min={10}
                    max={200}
                    step={1}
                    value={[parameters.maSlow]}
                    onValueChange={(value) => handleInputChange("maSlow", value[0])}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-300 transform hover:-translate-y-1 shadow-glow" disabled={isLoading}>
            {isLoading ? "Analysing..." : "Analyse Stock"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradingForm;
