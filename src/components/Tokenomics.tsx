import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CountUp from 'react-countup';

interface TokenomicsData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

const Tokenomics: React.FC = () => {
  const tokenomicsData: TokenomicsData[] = [
    { name: 'Public Sale', value: 400000000, color: '#00D4FF', percentage: 40 },
    { name: 'Development', value: 250000000, color: '#6366F1', percentage: 25 },
    { name: 'Marketing', value: 200000000, color: '#8B5CF6', percentage: 20 },
    { name: 'Team & Advisors', value: 150000000, color: '#6B7280', percentage: 15 },
  ];

  const totalSupply = 1000000000;
  const currentPrice = 0.00125;
  const marketCap = totalSupply * currentPrice;

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
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-6 shadow-2xl glow-effect">
      <h3 className="text-2xl font-bold text-white mb-6 animate-fade-in">Tokenomics</h3>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="space-y-6 animate-slide-in-left">
          <div className="h-64 bg-crypto-gray-800/30 rounded-xl p-4 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
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
          
          <div className="grid grid-cols-2 gap-4">
            {tokenomicsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-crypto-gray-800/50 rounded-lg hover:bg-crypto-gray-700/50 transition-all duration-300 transform hover:scale-105">
                <div 
                  className="w-4 h-4 rounded-full shadow-lg" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-crypto-gray-400 text-sm">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Details */}
        <div className="space-y-6 animate-slide-in-right">
          <div className="bg-crypto-gray-800/50 rounded-lg p-6 shadow-xl glow-effect">
            <h4 className="text-lg font-bold text-white mb-4">Token Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Total Supply</span>
                <span className="text-white font-bold">
                  <CountUp end={totalSupply} separator="," /> PAN
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Circulating Supply</span>
                <span className="text-white font-bold">
                  <CountUp end={400000000} separator="," /> PAN
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Current Price</span>
                <span className="text-white font-bold">${currentPrice.toFixed(6)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Market Cap</span>
                <span className="text-white font-bold">
                  ${(marketCap / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Blockchain</span>
                <span className="text-white font-bold">Ethereum</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-crypto-gray-700/30 rounded-lg hover:bg-crypto-gray-700/50 transition-colors">
                <span className="text-crypto-gray-300">Token Standard</span>
                <span className="text-white font-bold">ERC-20</span>
              </div>
            </div>
          </div>

          <div className="bg-crypto-gray-800/50 rounded-lg p-6 shadow-xl glow-effect">
            <h4 className="text-lg font-bold text-white mb-4">Staking Rewards</h4>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2 animate-glow">12% APY</div>
              <p className="text-crypto-gray-300">Annual staking rewards for long-term holders</p>
            </div>
          </div>

          <div className="bg-crypto-gray-800/50 rounded-lg p-6 shadow-xl glow-effect">
            <h4 className="text-lg font-bold text-white mb-4">Vesting Schedule</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300">Public Sale</span>
                <span className="text-white font-bold">No Lock</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300">Team & Advisors</span>
                <span className="text-white font-bold">12 months</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-crypto-gray-700/30 rounded-lg">
                <span className="text-crypto-gray-300">Development</span>
                <span className="text-white font-bold">6 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics; 