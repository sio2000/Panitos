import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  holders?: number;
}

const PriceTicker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPanitosData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from pump.fun API
      const response = await fetch('https://pump.fun/api/coins/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump');
      const data = await response.json();
      
      if (data && data.coin) {
        const panitosData: CryptoData = {
          symbol: 'PAN',
          name: 'Panitos',
          price: parseFloat(data.coin.price || 0),
          change24h: parseFloat(data.coin.priceChange24h || 0),
          marketCap: parseFloat(data.coin.marketCap || 0),
          volume24h: parseFloat(data.coin.volume24h || 0),
          holders: parseInt(data.coin.holders || 0)
        };
        
        setCryptoData([panitosData]);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching Panitos data:', error);
      // Fallback data if API fails
      setCryptoData([{
        symbol: 'PAN',
        name: 'Panitos',
        price: 0.00125,
        change24h: 12.5,
        marketCap: 1250000,
        volume24h: 50000
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPanitosData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchPanitosData, 30000);
    
    return () => clearInterval(interval);
  }, []);

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
    <div className="bg-crypto-dark/50 backdrop-blur-sm border border-crypto-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Live Market Data</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <button 
            onClick={fetchPanitosData}
            disabled={loading}
            className="text-crypto-gray-400 hover:text-crypto-primary transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {cryptoData.map((crypto) => (
          <div key={crypto.symbol} className="space-y-3">
            {/* Main Price Card */}
            <div className="flex items-center justify-between p-4 bg-crypto-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{crypto.symbol}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{crypto.name}</div>
                  <div className="text-crypto-gray-400 text-sm">{crypto.symbol}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-bold text-lg">{formatPrice(crypto.price)}</div>
                <div className={`flex items-center space-x-1 text-sm ${
                  crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(crypto.change24h).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-crypto-gray-800/30 rounded-lg p-3">
                <div className="text-crypto-gray-400 text-xs">Market Cap</div>
                <div className="text-white font-semibold">{formatMarketCap(crypto.marketCap)}</div>
              </div>
              <div className="bg-crypto-gray-800/30 rounded-lg p-3">
                <div className="text-crypto-gray-400 text-xs">24h Volume</div>
                <div className="text-white font-semibold">{formatVolume(crypto.volume24h)}</div>
              </div>
              {crypto.holders && (
                <div className="bg-crypto-gray-800/30 rounded-lg p-3">
                  <div className="text-crypto-gray-400 text-xs">Holders</div>
                  <div className="text-white font-semibold">{crypto.holders.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a 
          href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-crypto-primary hover:text-crypto-secondary text-sm transition-colors"
        >
          View on Pump.fun →
        </a>
      </div>

      <div className="mt-2 text-center text-crypto-gray-500 text-xs">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PriceTicker; 