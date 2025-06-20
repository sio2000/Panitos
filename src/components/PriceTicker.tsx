import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

const PriceTicker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    { symbol: 'PAN', name: 'Panitos', price: 0.00125, change24h: 12.5, marketCap: 1250000 },
    { symbol: 'BTC', name: 'Bitcoin', price: 43250, change24h: 2.3, marketCap: 850000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650, change24h: -1.2, marketCap: 320000000000 },
    { symbol: 'SOL', name: 'Solana', price: 98.5, change24h: 5.7, marketCap: 45000000000 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
        change24h: crypto.change24h + (Math.random() - 0.5) * 2
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Live Market Data</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-3">
        {cryptoData.map((crypto, index) => (
          <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-crypto-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{crypto.symbol}</span>
              </div>
              <div>
                <div className="text-white font-semibold">{crypto.name}</div>
                <div className="text-crypto-gray-400 text-sm">{crypto.symbol}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold">{formatPrice(crypto.price)}</div>
              <div className={`flex items-center space-x-1 text-sm ${
                crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(crypto.change24h).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker; 