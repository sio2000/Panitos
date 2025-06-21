import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface TradeData {
  price: number;
  amount: number;
  side: 'buy' | 'sell';
  timestamp: number;
  txHash: string;
}

interface MarketData {
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  recentTrades: TradeData[];
  lastUpdated: Date;
}

interface PriceChartProps {
  marketData: MarketData;
  onRefresh: () => void;
}

interface ChartData {
  time: string;
  price: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ marketData, onRefresh }) => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');

  // Generate chart data from recent trades
  const chartData = useMemo(() => {
    if (marketData.recentTrades.length === 0) {
      // Fallback data if no trades available
      const data: ChartData[] = [];
      const now = new Date();
      const basePrice = marketData.currentPrice;
      
      let points = 24;
      let interval = 60 * 60 * 1000; // 1 hour
      
      if (timeframe === '1H') {
        points = 60;
        interval = 60 * 1000; // 1 minute
      } else if (timeframe === '7D') {
        points = 168;
        interval = 60 * 60 * 1000; // 1 hour
      } else if (timeframe === '30D') {
        points = 30;
        interval = 24 * 60 * 60 * 1000; // 1 day
      }
      
      for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * interval);
        const progress = i / points;
        
        const trend = marketData.priceChange24h >= 0 ? 1 : -1;
        const volatility = Math.abs(marketData.priceChange24h) / 100;
        const priceVariation = Math.sin(progress * Math.PI * 2) * volatility * 0.5;
        const randomVariation = (Math.random() - 0.5) * volatility * 0.3;
        const price = basePrice * (1 + trend * progress * Math.abs(marketData.priceChange24h) / 100 + priceVariation + randomVariation);
        
        let timeString = '';
        if (timeframe === '1H') {
          timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (timeframe === '24H') {
          timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (timeframe === '7D') {
          timeString = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
          timeString = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        
        data.push({
          time: timeString,
          price: Math.max(price, 0.000001)
        });
      }
      
      return data;
    }

    // Use real trade data
    const sortedTrades = [...marketData.recentTrades].sort((a, b) => a.timestamp - b.timestamp);
    const now = Date.now();
    const timeframeMs = timeframe === '1H' ? 60 * 60 * 1000 : 
                       timeframe === '24H' ? 24 * 60 * 60 * 1000 :
                       timeframe === '7D' ? 7 * 24 * 60 * 60 * 1000 :
                       30 * 24 * 60 * 60 * 1000;
    
    const filteredTrades = sortedTrades.filter(trade => 
      trade.timestamp >= now - timeframeMs
    );

    if (filteredTrades.length === 0) {
      return [{
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        price: marketData.currentPrice
      }];
    }

    // Group trades by time intervals and calculate average prices
    const interval = timeframe === '1H' ? 60 * 1000 : // 1 minute
                    timeframe === '24H' ? 5 * 60 * 1000 : // 5 minutes
                    timeframe === '7D' ? 60 * 60 * 1000 : // 1 hour
                    24 * 60 * 60 * 1000; // 1 day

    const groupedTrades = new Map<number, number[]>();
    
    filteredTrades.forEach(trade => {
      const intervalTime = Math.floor(trade.timestamp / interval) * interval;
      if (!groupedTrades.has(intervalTime)) {
        groupedTrades.set(intervalTime, []);
      }
      groupedTrades.get(intervalTime)!.push(trade.price);
    });

    const chartData: ChartData[] = Array.from(groupedTrades.entries())
      .map(([timestamp, prices]) => {
        const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const time = new Date(timestamp);
        
        let timeString = '';
        if (timeframe === '1H') {
          timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (timeframe === '24H') {
          timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (timeframe === '7D') {
          timeString = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
          timeString = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        
        return {
          time: timeString,
          price: avgPrice
        };
      })
      .sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeA - timeB;
      });

    return chartData;
  }, [marketData.recentTrades, marketData.currentPrice, marketData.priceChange24h, timeframe]);

  const isPositive = marketData.priceChange24h >= 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-crypto-dark border border-crypto-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-crypto-gray-300 text-sm">{label}</p>
          <p className="text-white font-bold">
            ${payload[0].value.toFixed(6)}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatPrice = (price: number) => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(2)}K`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white">Panitos (PAN) Price</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-white">{formatPrice(marketData.currentPrice)}</span>
            <div className={`flex items-center space-x-1 text-xs sm:text-sm ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span>{Math.abs(marketData.priceChange24h).toFixed(2)}%</span>
            </div>
          </div>
          <div className="text-crypto-gray-400 text-xs sm:text-sm mt-1">
            Market Cap: {formatMarketCap(marketData.marketCap)}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={onRefresh}
            className="text-crypto-gray-400 hover:text-crypto-primary transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-1 sm:space-x-2">
            {(['1H', '24H', '7D', '30D'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-crypto-primary text-white'
                    : 'bg-crypto-gray-700 text-crypto-gray-300 hover:bg-crypto-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(6)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00D4FF"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center">
        <a 
          href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-crypto-primary hover:text-crypto-secondary text-xs sm:text-sm transition-colors"
        >
          View Detailed Chart on Pump.fun →
        </a>
      </div>
    </div>
  );
};

export default PriceChart; 