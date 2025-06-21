import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff } from 'lucide-react';

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

interface PriceTickerProps {
  marketData: MarketData;
  isConnected: boolean;
  error: string | null;
  onRefresh: () => void;
}

const PriceTicker: React.FC<PriceTickerProps> = ({ 
  marketData, 
  isConnected, 
  error, 
  onRefresh 
}) => {
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

  const formatVolume = (volume: number) => {
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toLocaleString()}`;
  };

  return (
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-white">Live Market Data</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          {isConnected ? (
            <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          ) : (
            <WifiOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
          )}
          <button 
            onClick={onRefresh}
            className="text-crypto-gray-400 hover:text-crypto-primary transition-colors"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-xs sm:text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-2 sm:space-y-3">
        {/* Main Price Card */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-crypto-gray-800/50 rounded-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-bold">PAN</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm sm:text-lg">Panitos</div>
              <div className="text-crypto-gray-400 text-xs sm:text-sm">PAN</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white font-bold text-sm sm:text-lg">{formatPrice(marketData.currentPrice)}</div>
            <div className={`flex items-center space-x-1 text-xs sm:text-sm ${
              marketData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {marketData.priceChange24h >= 0 ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span>{Math.abs(marketData.priceChange24h).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-crypto-gray-800/30 rounded-lg p-2 sm:p-3">
            <div className="text-crypto-gray-400 text-xs">Market Cap</div>
            <div className="text-white font-semibold text-xs sm:text-sm">{formatMarketCap(marketData.marketCap)}</div>
          </div>
          <div className="bg-crypto-gray-800/30 rounded-lg p-2 sm:p-3">
            <div className="text-crypto-gray-400 text-xs">24h Volume</div>
            <div className="text-white font-semibold text-xs sm:text-sm">{formatVolume(marketData.volume24h)}</div>
          </div>
          <div className="bg-crypto-gray-800/30 rounded-lg p-2 sm:p-3">
            <div className="text-crypto-gray-400 text-xs">Holders</div>
            <div className="text-white font-semibold text-xs sm:text-sm">{marketData.holders.toLocaleString()}</div>
          </div>
          <div className="bg-crypto-gray-800/30 rounded-lg p-2 sm:p-3">
            <div className="text-crypto-gray-400 text-xs">Recent Trades</div>
            <div className="text-white font-semibold text-xs sm:text-sm">{marketData.recentTrades.length}</div>
          </div>
        </div>

        {/* Recent Trades */}
        {marketData.recentTrades.length > 0 && (
          <div className="bg-crypto-gray-800/30 rounded-lg p-2 sm:p-3">
            <div className="text-crypto-gray-400 text-xs mb-2">Recent Trades</div>
            <div className="space-y-1 max-h-24 sm:max-h-32 overflow-y-auto">
              {marketData.recentTrades.slice(0, 5).map((trade, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className={`${
                    trade.side === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trade.side.toUpperCase()}
                  </span>
                  <span className="text-white">{formatPrice(trade.price)}</span>
                  <span className="text-crypto-gray-400">
                    {new Date(trade.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <a 
          href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-crypto-primary hover:text-crypto-secondary text-xs sm:text-sm transition-colors"
        >
          View on Pump.fun →
        </a>
      </div>

      <div className="mt-2 text-center text-crypto-gray-500 text-xs">
        Last updated: {marketData.lastUpdated.toLocaleTimeString()}
        {isConnected && <span className="ml-2 text-green-400">● Live</span>}
      </div>
    </div>
  );
};

export default PriceTicker; 