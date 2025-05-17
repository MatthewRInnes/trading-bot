import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/sonner";

interface PythonCodeBlockProps {
  title?: string;
}

/**
 * PythonCodeBlock Component
 * Displays a block of Python code with a copy-to-clipboard button
 * The code demonstrates a trading bot implementation using technical indicators
 */
const PythonCodeBlock = ({ title = "Python Implementation" }: PythonCodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const pythonCode = `# Import necessary libraries
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import ta

# Fetch historical data from Yahoo Finance
def fetch_data(symbol, period="6mo", interval="1d"):
    data = yf.download(symbol, period=period, interval=interval)
    data.reset_index(inplace=True)
    return data

# Calculate RSI
def calculate_rsi(data, period=14):
    return ta.momentum.RSIIndicator(data['Close'], window=period).rsi()

# Calculate Moving Averages
def calculate_ma(data, fast_period=20, slow_period=50):
    data['MA_Fast'] = data['Close'].rolling(window=fast_period).mean()
    data['MA_Slow'] = data['Close'].rolling(window=slow_period).mean()
    return data

# Generate trading signals
def generate_signals(data, rsi_period=14, rsi_oversold=30, rsi_overbought=70):
    signals = []
    
    # Previous values for comparison
    data['RSI_Prev'] = data['RSI'].shift(1)
    data['MA_Fast_Prev'] = data['MA_Fast'].shift(1)
    data['MA_Slow_Prev'] = data['MA_Slow'].shift(1)
    
    for i in range(1, len(data)):
        # Skip NaN values
        if pd.isna(data.loc[i, 'RSI']) or pd.isna(data.loc[i, 'MA_Fast']):
            continue
        
        signal = 'HOLD'
        reason = ''
        
        # Check MA Crossover
        current_cross = data.loc[i, 'MA_Fast'] > data.loc[i, 'MA_Slow']
        prev_cross = data.loc[i, 'MA_Fast_Prev'] > data.loc[i, 'MA_Slow_Prev']
        
        if current_cross and not prev_cross:
            signal = 'BUY'
            reason = "MA crossover: Fast MA crossed above Slow MA"
        elif not current_cross and prev_cross:
            signal = 'SELL'
            reason = "MA crossover: Fast MA crossed below Slow MA"
        
        # Check RSI signals if no MA signal
        if signal == 'HOLD':
            if data.loc[i, 'RSI'] < rsi_oversold and data.loc[i, 'RSI_Prev'] >= rsi_oversold:
                signal = 'BUY'
                reason = "RSI oversold: RSI dropped below threshold"
            elif data.loc[i, 'RSI'] > rsi_overbought and data.loc[i, 'RSI_Prev'] <= rsi_overbought:
                signal = 'SELL'
                reason = "RSI overbought: RSI rose above threshold"
        
        if signal != 'HOLD':
            signals.append({
                'Date': data.loc[i, 'Date'],
                'Signal': signal,
                'Price': data.loc[i, 'Close'],
                'Reason': reason
            })
    
    return signals

# Main function
def main():
    # Parameters
    symbol = "AAPL"
    period = "6mo"
    interval = "1d"
    rsi_period = 14
    rsi_oversold = 30
    rsi_overbought = 70
    ma_fast = 20
    ma_slow = 50
    
    # Fetch data
    print("Fetching data for " + symbol)
    data = fetch_data(symbol, period, interval)
    
    # Calculate indicators
    print("Calculating indicators...")
    data['RSI'] = calculate_rsi(data, rsi_period)
    data = calculate_ma(data, ma_fast, ma_slow)
    
    # Generate signals
    print("Generating trading signals...")
    signals = generate_signals(data, rsi_period, rsi_oversold, rsi_overbought)
    
    # Print signals
    print("Signal Summary:")
    for signal in signals:
        print(signal['Date'], signal['Signal'], "$" + str(signal['Price']), signal['Reason'])

if __name__ == "__main__":
    main()`;

  /**
   * Copies the Python code to the clipboard
   * Shows a success toast when copied, or an error toast if copying fails
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode).then(
      () => {
        setIsCopied(true);
        toast.success("Code copied to clipboard");
        setTimeout(() => setIsCopied(false), 2000);
      },
      () => {
        toast.error("Failed to copy code");
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 gap-1"
        >
          <Copy className="h-3.5 w-3.5" />
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full rounded-md border">
          <pre className="p-4 text-sm font-mono bg-sidebar">
            <code>{pythonCode}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PythonCodeBlock;
