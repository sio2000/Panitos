import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  time: string;
  price: number;
}

const PriceChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      const data: ChartData[] = [];
      const now = new Date();
      const basePrice = 0.00125;
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const price = basePrice * (1 + Math.sin(i * 0.3) * 0.1 + (Math.random() - 0.5) * 0.05);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: price
        });
      }
      return data;
    };

    setChartData(generateData());
  }, [timeframe]);

  const currentPrice = chartData[chartData.length - 1]?.price || 0.00125;
  const previousPrice = chartData[0]?.price || 0.00125;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = priceChange >= 0;

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

  return (
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Panitos (PAN) Price</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold text-white">${currentPrice.toFixed(6)}</span>
            <div className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(priceChange).toFixed(2)}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {(['1H', '24H', '7D', '30D'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
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

      <div className="h-64">
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
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
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
    </div>
  );
};

export default PriceChart; 