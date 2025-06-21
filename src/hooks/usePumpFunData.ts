import { useState, useEffect, useRef } from 'react';

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

const PANITOS_TOKEN_ADDRESS = '72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump';

export const usePumpFunData = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    currentPrice: 0.000008098,
    priceChange24h: 12.5,
    volume24h: 50000,
    marketCap: 4049,
    holders: 150,
    recentTrades: [],
    lastUpdated: new Date()
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connectWebSocket = () => {
    try {
      const ws = new WebSocket('wss://pumpportal.fun/api/data');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to PumpPortal WebSocket');
        setIsConnected(true);
        setError(null);
        
        // Subscribe to token trades
        const subscribeMessage = {
          method: "subscribeTokenTrade",
          keys: [PANITOS_TOKEN_ADDRESS]
        };
        ws.send(JSON.stringify(subscribeMessage));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error. Trying to reconnect...');
      };

    } catch (err) {
      console.error('Error creating WebSocket connection:', err);
      setError('Failed to connect to market data feed');
    }
  };

  const handleWebSocketMessage = (data: any) => {
    if (data.type === 'trade' && data.token === PANITOS_TOKEN_ADDRESS) {
      const trade: TradeData = {
        price: parseFloat(data.price) || 0,
        amount: parseFloat(data.amount) || 0,
        side: data.side || 'buy',
        timestamp: Date.now(),
        txHash: data.txHash || ''
      };

      setMarketData(prevData => {
        const newTrades = [trade, ...prevData.recentTrades.slice(0, 49)]; // Keep last 50 trades
        
        // Calculate new market data based on the trade
        const newPrice = trade.price;
        const priceChange = prevData.currentPrice > 0 
          ? ((newPrice - prevData.currentPrice) / prevData.currentPrice) * 100 
          : 0;
        
        return {
          ...prevData,
          currentPrice: newPrice,
          priceChange24h: priceChange,
          volume24h: prevData.volume24h + trade.amount,
          recentTrades: newTrades,
          lastUpdated: new Date()
        };
      });
    }
  };

  const fetchInitialData = async () => {
    try {
      // Try to fetch initial data from PumpPortal API
      const response = await fetch(`https://pumpportal.fun/api/token/${PANITOS_TOKEN_ADDRESS}`);
      if (response.ok) {
        const data = await response.json();
        setMarketData(prevData => ({
          ...prevData,
          currentPrice: parseFloat(data.price) || prevData.currentPrice,
          volume24h: parseFloat(data.volume24h) || prevData.volume24h,
          marketCap: parseFloat(data.marketCap) || prevData.marketCap,
          holders: parseInt(data.holders) || prevData.holders,
          lastUpdated: new Date()
        }));
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
      // Keep using fallback data if API fails
    }
  };

  useEffect(() => {
    fetchInitialData();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const refreshData = () => {
    fetchInitialData();
  };

  return {
    marketData,
    isConnected,
    error,
    refreshData
  };
}; 