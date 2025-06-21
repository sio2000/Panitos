import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CountUp from 'react-countup';

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

interface TokenomicsData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface TokenomicsProps {
  lang: 'en' | 'el';
  t: any; // Using 'any' for simplicity, you could define a stricter type for t
  marketData: MarketData;
}

const Tokenomics: React.FC<TokenomicsProps> = ({ lang, t, marketData }) => {
  const tokenomicsContent = t[lang].tokenomics;
  
  const tokenomicsData: TokenomicsData[] = [
    { name: tokenomicsContent.distribution.lp, value: 500000000, color: '#00D4FF', percentage: 50 },
    { name: tokenomicsContent.distribution.sale, value: 300000000, color: '#6366F1', percentage: 30 },
    { name: tokenomicsContent.distribution.dev, value: 150000000, color: '#8B5CF6', percentage: 15 },
    { name: tokenomicsContent.distribution.marketing, value: 50000000, color: '#6B7280', percentage: 5 },
  ];

  const totalSupply = 1000000000; // 1 billion PAN tokens
  const currentPrice = marketData.currentPrice;
  const marketCap = marketData.marketCap;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-crypto-dark border border-crypto-gray-700 rounded-lg p-3 shadow-lg backdrop-blur-md">
          <p className="text-white font-bold">{data.name}</p>
          <p className="text-crypto-gray-300">
            {data.value.toLocaleString()} PAN ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-4 sm:p-6 shadow-2xl glow-effect">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">{tokenomicsContent.title}</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Chart */}
        <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
          <div className="h-48 sm:h-64 bg-crypto-gray-800/30 rounded-xl p-4 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {tokenomicsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-crypto-gray-800/50 rounded-lg hover:bg-crypto-gray-700/50 transition-all duration-300 transform hover:scale-105">
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm">{item.name}</div>
                  <div className="text-crypto-gray-400 text-xs">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Details */}
        <div className="space-y-4 sm:space-y-6 animate-slide-in-right">
          <div className="bg-crypto-gray-800/50 rounded-lg p-4 sm:p-6 shadow-xl glow-effect">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{tokenomicsContent.detailsTitle}</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.totalSupply}</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  <CountUp end={totalSupply} separator="," /> PAN
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.circulatingSupply}</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  <CountUp end={800000000} separator="," /> PAN
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.currentPrice}</span>
                <span className="text-white font-bold text-sm sm:text-base">${currentPrice.toFixed(8)}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.marketCap}</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  ${marketCap.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.blockchain}</span>
                <span className="text-white font-bold text-sm sm:text-base">Solana</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.tokenStandard}</span>
                <span className="text-white font-bold text-sm sm:text-base">SPL Token</span>
              </div>
            </div>
          </div>

          <div className="bg-crypto-gray-800/50 rounded-lg p-4 sm:p-6 shadow-xl glow-effect">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{tokenomicsContent.launchInfoTitle}</h4>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold gradient-text mb-2 animate-glow">{tokenomicsContent.launchInfoStatus}</div>
              <p className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.launchInfoDesc}</p>
              <div className="mt-3 text-xs sm:text-sm text-crypto-gray-400">
                {tokenomicsContent.marketCap}: ${marketCap.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-crypto-gray-800/50 rounded-lg p-4 sm:p-6 shadow-xl glow-effect">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{tokenomicsContent.utilityTitle}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.utilityTrading}</span>
                <span className="text-white font-bold text-sm sm:text-base">{tokenomicsContent.utilityAvailable}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.utilityLiquidity}</span>
                <span className="text-white font-bold text-sm sm:text-base">{tokenomicsContent.utilityLocked}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300 text-sm sm:text-base">{tokenomicsContent.utilityPlatform}</span>
                <span className="text-white font-bold text-sm sm:text-base">Pump.fun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics; 