// PortfolioDetail.jsx
import React, { useState, useEffect } from 'react';
import {
  FaChartPie, FaChartLine, FaDownload,
  FaShoppingCart, FaMoneyBillWave, FaTimes, FaWallet
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
// import './PortfolioDetail.css'; // Removed external CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PortfolioDetail = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    // Fetch portfolio data
    const fetchPortfolio = async () => {
      // Mock data
      const mockData = [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          quantity: 0.025,
          avgBuyPrice: 5245000,
          currentPrice: 5678234,
          allocation: 35
        },
        {
          id: 2,
          name: 'Ethereum',
          symbol: 'ETH',
          quantity: 1.5,
          avgBuyPrice: 320000,
          currentPrice: 345678,
          allocation: 45
        },
        {
          id: 3,
          name: 'Solana',
          symbol: 'SOL',
          quantity: 15,
          avgBuyPrice: 11200,
          currentPrice: 12345,
          allocation: 20
        }
      ];
      setPortfolio(mockData);
    };
    fetchPortfolio();
  }, []);

  const calculateMetrics = () => {
    let totalInvestment = 0;
    let currentValue = 0;

    portfolio.forEach(item => {
      totalInvestment += item.quantity * item.avgBuyPrice;
      currentValue += item.quantity * item.currentPrice;
    });

    const totalReturns = currentValue - totalInvestment;
    const returnPercentage = totalInvestment > 0 ? (totalReturns / totalInvestment) * 100 : 0;

    return {
      totalInvestment,
      currentValue,
      totalReturns,
      returnPercentage
    };
  };

  const metrics = calculateMetrics();

  const allocationData = {
    labels: portfolio.map(item => item.symbol),
    datasets: [
      {
        data: portfolio.map(item => item.allocation),
        backgroundColor: [
          '#6a2836ff',
          '#205071ff',
          '#a18335ff',
          '#368d8dff',
          '#603fa2ff',
          '#7d4b19ff'
        ]
      }
    ]
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [100000, 105000, 110000, 98000, 108000, 112000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const exportPortfolio = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-export.json';
    link.click();
  };

  // Styles Definition
  const styles = {
    portfolioDetail: {
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    statCard: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      padding: '24px',
      border: 'none',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
      transition: 'transform 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    statIcon: {
      width: '56px',
      height: '56px',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#3b82f6',
    },
    statContentH3: {
      color: '#9ca3af',
      fontSize: '14px',
      margin: '0 0 12px 0',
      fontWeight: '500',
    },
    statContentH1: {
      fontSize: '32px',
      margin: '0 0 8px 0',
      color: '#ffffff',
      fontWeight: '700',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    card: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      border: 'none',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
    },
    chartCard: {
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    chartContainer: {
      flex: 1,
      position: 'relative',
      minHeight: '300px',
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
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
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
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      overflow: 'hidden',
    },
    th: {
      padding: '16px 24px',
      background: 'rgba(2, 6, 23, 0.9)',
      fontWeight: '600',
      color: '#94a3b8',
      fontSize: '14px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'left',
    },
    td: {
      padding: '16px 24px',
      borderBottom: '1px solid rgba(30, 41, 59, 0.3)',
      color: '#ffffff',
      fontSize: '14px',
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
      fontWeight: 'bold',
      color: 'white',
      fontSize: '13px',
    },
    // Modal
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modal: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      width: '480px',
      maxWidth: '100%',
      border: 'none',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      overflow: 'hidden',
    },
    modalHeader: {
      padding: '20px 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
    },
    modalBody: {
      padding: '24px',
    },
    tradeOptions: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px',
    },
    tradeBtn: {
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.2s',
    },
    tradeInfo: {
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #334155',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.portfolioDetail}>
      {/* Header */}
      <div style={styles.header}>
        <div className="header-left">
          <h1 style={styles.headerLeftH1}><FaChartPie /> Portfolio Details</h1>
          <p style={styles.textMuted}>Detailed view of your paper trading portfolio</p>
        </div>
        <div className="header-right">
          <button style={styles.btnPrimary} onClick={exportPortfolio}>
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaMoneyBillWave />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={styles.statContentH3}>Total Investment</h3>
            <h1 style={styles.statContentH1}>{formatCurrency(metrics.totalInvestment)}</h1>
            <p style={styles.textMuted}>Allocated capital</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <FaWallet />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={styles.statContentH3}>Current Value</h3>
            <h1 style={{ ...styles.statContentH1, color: '#10b981' }}>{formatCurrency(metrics.currentValue)}</h1>
            <p style={styles.textMuted}>Market value</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <FaChartLine />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={styles.statContentH3}>Total Returns</h3>
            <h1 style={{ ...styles.statContentH1, color: metrics.totalReturns >= 0 ? '#10b981' : '#ef4444' }}>
              {metrics.totalReturns >= 0 ? '+' : ''}{formatCurrency(metrics.totalReturns)}
            </h1>
            <p style={styles.textMuted}>
              <span style={{ color: metrics.returnPercentage >= 0 ? '#10b981' : '#ef4444' }}>
                {metrics.returnPercentage >= 0 ? '+' : ''}{metrics.returnPercentage.toFixed(2)}%
              </span> overall
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartsGrid}>
        <div style={{ ...styles.card, ...styles.chartCard }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}><FaChartPie style={{ color: '#3b82f6' }} /> Asset Allocation</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.chartContainer}>
              <Pie
                data={allocationData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#94a3b8' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ ...styles.card, ...styles.chartCard }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}><FaChartLine style={{ color: '#3b82f6' }} /> Portfolio Performance</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.chartContainer}>
              <Bar
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
                  },
                  plugins: {
                    legend: { labels: { color: '#94a3b8' } }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Holdings */}
      <div style={{ ...styles.card, marginTop: '24px' }}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardHeaderH3}>Detailed Holdings</h3>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.tableResponsive}>
            <table style={styles.customTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Asset</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Avg Buy Price</th>
                  <th style={styles.th}>Current Price</th>
                  <th style={styles.th}>Total Cost</th>
                  <th style={styles.th}>Current Value</th>
                  <th style={styles.th}>P&L</th>
                  <th style={styles.th}>% Return</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item) => {
                  const totalCost = item.quantity * item.avgBuyPrice;
                  const currentValue = item.quantity * item.currentPrice;
                  const pnl = currentValue - totalCost;
                  const returnPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

                  return (
                    <tr key={item.id}>
                      <td style={styles.td}>
                        <div style={styles.assetInfo}>
                          <div style={styles.cryptoIcon}>
                            {item.symbol.charAt(0)}
                          </div>
                          <div>
                            <strong style={{ color: '#fff' }}>{item.name}</strong>
                            <br />
                            <small style={styles.textMuted}>{item.symbol}</small>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>{item.quantity.toFixed(4)}</td>
                      <td style={styles.td}>{formatCurrency(item.avgBuyPrice)}</td>
                      <td style={styles.td}>{formatCurrency(item.currentPrice)}</td>
                      <td style={styles.td}>{formatCurrency(totalCost)}</td>
                      <td style={styles.td}>{formatCurrency(currentValue)}</td>
                      <td style={styles.td}>
                        <span style={{ color: pnl >= 0 ? '#10b981' : '#ef4444' }}>
                          {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: returnPercentage >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: returnPercentage >= 0 ? '#10b981' : '#ef4444',
                          border: `1px solid ${returnPercentage >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                        }}>
                          {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={{ ...styles.btnPrimary, background: '#3b82f6', padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => {
                            setSelectedAsset(item);
                            setShowTradeModal(true);
                          }}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trade Modal */}
      {showTradeModal && selectedAsset && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>Trade {selectedAsset.name}</h3>
              <button
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowTradeModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.tradeOptions}>
                <button style={{ ...styles.tradeBtn, borderColor: '#10b981', color: '#10b981' }}>
                  <FaShoppingCart style={{ fontSize: '24px' }} /> Buy
                </button>
                <button style={{ ...styles.tradeBtn, borderColor: '#ef4444', color: '#ef4444' }}>
                  <FaMoneyBillWave style={{ fontSize: '24px' }} /> Sell
                </button>
              </div>

              <div style={styles.tradeInfo}>
                <div style={styles.infoRow}>
                  <span style={styles.textMuted}>Current Price:</span>
                  <strong style={{ color: '#fff' }}>{formatCurrency(selectedAsset.currentPrice)}</strong>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.textMuted}>Your Holdings:</span>
                  <strong style={{ color: '#fff' }}>{selectedAsset.quantity} {selectedAsset.symbol}</strong>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.textMuted}>Avg Buy Price:</span>
                  <strong style={{ color: '#fff' }}>{formatCurrency(selectedAsset.avgBuyPrice)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail;
