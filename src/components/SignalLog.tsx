import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { SignalData } from "./StockChart";

interface SignalLogProps {
  signals: SignalData[];
  showDetails?: boolean;
}

/**
 * SignalLog Component
 * Displays a chronological log of trading signals with their details
 * Shows a message when no signals are available
 */
const SignalLog = ({ signals, showDetails = true }: SignalLogProps) => {
  // Display a message when no signals are available
  if (signals.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Signal Log</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">No signals generated yet. Analyse a stock to see trading signals.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Render the signal log with all available signals
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Signal Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {signals.map((signal, index) => {
              const date = new Date(signal.date).toLocaleDateString();
              
              return (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg"
                >
                  {/* Signal header with date and type */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{date}</h3>
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
                  
                  {/* Signal price information */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Price: ${signal.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Optional signal reason/details */}
                  {showDetails && (
                    <p className="mt-2 text-sm">{signal.reason}</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SignalLog;
