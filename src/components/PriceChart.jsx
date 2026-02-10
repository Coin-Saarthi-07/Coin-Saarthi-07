import React, { useState, useEffect } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        color: 'white',
        fontSize: '12px'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{label}</p>
        <p style={{ margin: '4px 0', color: '#60a5fa' }}>
          Price: <span style={{ fontWeight: '600' }}>${payload[0].value.toLocaleString()}</span>
        </p>
        {payload[1] && (
          <p style={{ margin: '4px 0', color: '#22c55e' }}>
            Volume: <span style={{ fontWeight: '600' }}>${payload[1].value.toLocaleString()}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const PriceChart = ({ symbol }) => {
  const [chartData, setChartData] = useState([]);
  const [coinStats, setCoinStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      setStatsLoading(true);
      fetchChartData();
    }
  }, [symbol]);

  const COIN_ID_MAP = {
    btc: "bitcoin",
    eth: "ethereum",
    sol: "solana",
    ada: "cardano",
    doge: "dogecoin",
  };

  // const fetchChartData = async () => {
  //   try {
  //     const coinId = COIN_ID_MAP[symbol.toLowerCase()];

  //     if (!coinId) {
  //       throw new Error("Unsupported coin symbol");
  //     }

  //     const response = await fetch(
  //       `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`,
  //       {
  //         headers: { Accept: "application/json" },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     const formattedData = data.prices.slice(-12).map((price, index) => {
  //       const date = new Date(price[0]);
  //       return {
  //         time: date.toLocaleTimeString("en-US", {
  //           hour: "numeric",
  //           hour12: true,
  //         }),
  //         price: Math.round(price[1] * 100) / 100,
  //         volume: data.total_volumes[index]
  //           ? Math.round(data.total_volumes[index][1])
  //           : 0,
  //       };
  //     });

  //     setChartData(formattedData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching chart data:", error);
  //     setChartData(generateMockData(symbol));
  //     setLoading(false);
  //   }
  // };
  const fetchChartData = async () => {
  try {
    const coinId = COIN_ID_MAP[symbol.toLowerCase()];
    if (!coinId) throw new Error("Unsupported coin symbol");

    const targetUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    
    const response = await fetch(targetUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (!data?.prices || !data?.total_volumes) {
      throw new Error("Invalid data structure from API");
    }

    const formattedData = data.prices.slice(-12).map((price, index) => {
      const date = new Date(price[0]);
      return {
        time: date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
        price: Math.round(price[1] * 100) / 100,
        volume: data.total_volumes[index] ? Math.round(data.total_volumes[index][1]) : 0,
      };
    });

    const prices24h = data.prices.map(p => p[1]);
    const volumes24h = data.total_volumes.map(v => v[1]);
    const high24h = Math.max(...prices24h);
    const low24h = Math.min(...prices24h);
    const currentPrice = prices24h[prices24h.length - 1];
    const startPrice = prices24h[0];
    const change24h = ((currentPrice - startPrice) / startPrice) * 100;
    const volume24h = volumes24h.reduce((a, b) => a + b, 0);

    setCoinStats({ high24h, low24h, change24h, volume24h });
    setStatsLoading(false);
    setChartData(formattedData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    setChartData(generateMockData(symbol));
    setLoading(false);
  }
};


  const generateMockData = (symbol) => {
    const basePrice = {
      'btc': 65000, 'eth': 3500, 'sol': 150, 'ada': 0.45, 'doge': 0.12
    }[symbol.toLowerCase()] || 100;

    const data = [];
    let price = basePrice;
    let high = basePrice;
    let low = basePrice;

    for (let i = 0; i < 12; i++) {
      const change = (Math.random() - 0.5) * (basePrice * 0.02);
      price += change;
      high = Math.max(high, price);
      low = Math.min(low, price);
      const hour = new Date(Date.now() - (11 - i) * 60 * 60 * 1000);

      data.push({
        time: hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        price: Math.round(price * 100) / 100,
        volume: Math.round(Math.random() * 1000000000)
      });
    }

    // Generate mock stats
    const change24h = ((price - basePrice) / basePrice) * 100;
    setCoinStats({
      high24h: high,
      low24h: low,
      change24h: change24h,
      volume24h: Math.round(Math.random() * 50000000000)
    });
    setStatsLoading(false);

    return data;
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    return `$${(volume / 1e3).toFixed(1)}K`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
        Loading chart data...
      </div>
    );
  }

  const styles = {
    container: {
      background: 'transparent',
      borderRadius: '16px',
      padding: '4px 0'
    },
    chartContainer: {
      marginTop: '20px'
    }
  };

  const gradientId = "priceGradient";

  return (
    <div style={styles.container}>
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="rgba(255, 255, 255, 0.3)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.3)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#0f172a' }}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        padding: '16px',
        background: 'rgba(15, 23, 42, 0.4)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>24H High</p>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e', margin: '0' }}>
            {statsLoading ? 'Loading...' : coinStats ? `$${coinStats.high24h.toLocaleString()}` : 'N/A'}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>24H Low</p>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444', margin: '0' }}>
            {statsLoading ? 'Loading...' : coinStats ? `$${coinStats.low24h.toLocaleString()}` : 'N/A'}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>24H Change</p>
          <p style={{ fontSize: '18px', fontWeight: '700', color: coinStats?.change24h >= 0 ? '#22c55e' : '#ef4444', margin: '0' }}>
            {statsLoading ? 'Loading...' : coinStats ? `${coinStats.change24h >= 0 ? '+' : ''}${coinStats.change24h.toFixed(2)}%` : 'N/A'}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>24H Volume</p>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#60a5fa', margin: '0' }}>
            {statsLoading ? 'Loading...' : coinStats ? formatVolume(coinStats.volume24h) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;