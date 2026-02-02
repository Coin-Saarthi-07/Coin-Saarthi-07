// TransactionHistory.jsx
import React, { useState, useEffect } from 'react';
import {
  FaHistory, FaDownload, FaTimes,
  FaShoppingCart, FaMoneyBillWave,
  FaRupeeSign, FaPercentage
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
// import './TransactionHistory.css'; // Removed external CSS


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [stats, setStats] = useState({
    totalBuys: 0,
    totalSells: 0,
    totalVolume: 0,
    successRate: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    // Mock data
    const mockTransactions = [
      { id: 1, date: '2024-03-15 10:30:00', type: 'BUY', asset: 'Bitcoin', symbol: 'BTC', quantity: 0.01, price: 5450000, total: 54500, status: 'COMPLETED' },
      { id: 2, date: '2024-03-14 14:20:00', type: 'SELL', asset: 'Ethereum', symbol: 'ETH', quantity: 0.5, price: 340000, total: 170000, status: 'COMPLETED' },
      { id: 3, date: '2024-03-13 09:15:00', type: 'BUY', asset: 'Solana', symbol: 'SOL', quantity: 10, price: 12000, total: 120000, status: 'COMPLETED' },
      { id: 4, date: '2024-03-12 16:45:00', type: 'BUY', asset: 'Cardano', symbol: 'ADA', quantity: 500, price: 45, total: 22500, status: 'COMPLETED' },
      { id: 5, date: '2024-03-11 11:20:00', type: 'SELL', asset: 'Bitcoin', symbol: 'BTC', quantity: 0.005, price: 5600000, total: 28000, status: 'COMPLETED' },
    ];

    setTransactions(mockTransactions);

    // Calculate stats
    const buys = mockTransactions.filter(t => t.type === 'BUY').length;
    const sells = mockTransactions.filter(t => t.type === 'SELL').length;
    const volume = mockTransactions.reduce((sum, t) => sum + t.total, 0);

    setStats({
      totalBuys: buys,
      totalSells: sells,
      totalVolume: volume,
      successRate: 78.5 // Mock success rate
    });
  };

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType.toUpperCase()) return false;
    if (filterDate && !t.date.includes(filterDate)) return false;
    return true;
  });

  const monthlyPnLData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly P&L',
        data: [5000, 12000, -3000, 18000, 25000, 15000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const topPerformers = [
    { name: 'Solana', symbol: 'SOL', return: 24.5, amount: 24500 },
    { name: 'Bitcoin', symbol: 'BTC', return: 15.2, amount: 18750 },
    { name: 'Ethereum', symbol: 'ETH', return: 12.8, amount: 14320 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportTransactions = () => {
    const csv = [
      ['Date', 'Type', 'Asset', 'Quantity', 'Price', 'Total Amount', 'Status'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type,
        t.asset,
        t.quantity,
        formatCurrency(t.price),
        formatCurrency(t.total),
        t.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
  };

  const clearFilters = () => {
    setFilterType('all');
    setFilterDate('');
  };

  // Styles Definition
  const styles = {
    transactionHistory: {
      padding: '24px',
      color: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    headerLeftH1: {
      fontSize: '28px',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#fff',
    },
    textMuted: {
      color: '#9ca3af',
      fontSize: '14px',
      margin: 0,
    },
    filters: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    formControl: {
      width: 'auto',
      minWidth: '150px',
      marginBottom: '0',
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '8px',
      outline: 'none',
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#e2e8f0',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    statCard: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      border: 'none',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
    },
    statContentH3: {
      fontSize: '14px',
      color: '#94a3b8',
      margin: '0 0 8px 0',
      fontWeight: '500',
    },
    statContentH2: {
      fontSize: '24px',
      margin: '0',
      fontWeight: '700',
      color: '#fff',
    },
    card: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      border: 'none',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #334155',
      background: 'rgba(30, 41, 59, 0.5)',
    },
    cardHeaderH3: {
      fontSize: '18px',
      margin: '0',
      color: '#fff',
    },
    cardBody: {
      padding: '24px',
    },
    tableResponsive: {
      overflowX: 'auto',
    },
    customTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      background: 'rgba(255, 255, 255, 0.04)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      background: 'rgba(2, 6, 23, 0.9)',
      color: '#94a3b8',
      fontWeight: '600',
      fontSize: '13px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      fontSize: '14px',
      color: '#e2e8f0',
    },
    assetInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    cryptoIcon: {
      width: '36px',
      height: '36px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      color: 'white',
      fontSize: '14px',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
      marginTop: '24px',
    },
    chartContainer: {
      flex: 1,
      position: 'relative',
      minHeight: '300px',
    },
    topPerformers: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    performerCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '12px',
      border: '1px solid transparent',
    },
    performerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0',
      color: '#94a3b8',
    },
  };

  return (
    <div style={styles.transactionHistory}>
      {/* Header */}
      <div style={styles.header}>
        <div className="header-left">
          <h1 style={styles.headerLeftH1}><FaHistory /> Transaction History</h1>
          <p style={styles.textMuted}>Record of your paper trading activity</p>
        </div>
        <div className="header-right">
          <div style={styles.filters}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={styles.formControl}
            >
              <option value="all">All Types</option>
              <option value="buy">Buy Only</option>
              <option value="sell">Sell Only</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={styles.formControl}
            />
            <button style={styles.btnSecondary} onClick={clearFilters}>
              <FaTimes /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Total Buys</h3>
            <h2 style={styles.statContentH2}>{stats.totalBuys}</h2>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <FaMoneyBillWave />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Total Sells</h3>
            <h2 style={styles.statContentH2}>{stats.totalSells}</h2>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <FaRupeeSign />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Total Volume</h3>
            <h2 style={styles.statContentH2}>{formatCurrency(stats.totalVolume)}</h2>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <FaPercentage />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Success Rate</h3>
            <h2 style={styles.statContentH2}>{stats.successRate}%</h2>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{ ...styles.card, marginTop: '24px' }}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardHeaderH3}>All Transactions</h3>
          <button style={styles.btnPrimary} onClick={exportTransactions}>
            <FaDownload /> Export CSV
          </button>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.tableResponsive}>
            <table style={styles.customTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Date & Time</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Asset</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Total Amount</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td style={styles.td}>{tx.date}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: tx.type === 'BUY' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: tx.type === 'BUY' ? '#10b981' : '#ef4444',
                        border: `1px solid ${tx.type === 'BUY' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                      }}>
                        {tx.type}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.assetInfo}>
                        <div style={styles.cryptoIcon}>
                          {tx.symbol.charAt(0)}
                        </div>
                        <div>
                          <strong style={{ color: '#fff' }}>{tx.asset}</strong>
                          <br />
                          <small style={styles.textMuted}>{tx.symbol}</small>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{tx.quantity}</td>
                    <td style={styles.td}>{formatCurrency(tx.price)}</td>
                    <td style={styles.td}>{formatCurrency(tx.total)}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                      }}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}>Monthly P&L</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.chartContainer}>
              <Line
                data={monthlyPnLData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}>Top Performers</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.topPerformers}>
              {topPerformers.map((performer, index) => (
                <div key={index} style={styles.performerCard}>
                  <div style={styles.performerInfo}>
                    <div style={styles.cryptoIcon}>
                      <span>{performer.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#fff' }}>{performer.name}</strong>
                      <br />
                      <small style={{ color: '#9ca3af' }}>{performer.symbol}</small>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#10b981' }}>
                      +{performer.return}%
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      +{formatCurrency(performer.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;