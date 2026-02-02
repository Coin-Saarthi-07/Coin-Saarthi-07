// PaperTrading.jsx
import React, { useState, useEffect } from 'react';
import {
  FaShoppingCart, FaMoneyBillWave, FaRedo,
  FaChartPie, FaEye, FaHistory, FaWallet,
  FaChartLine, FaCoins, FaDownload, FaTimes,
  FaSearch, FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import api from '../services/api';
import authService from '../services/authService';

const PaperTrading = () => {
  const [user, setUser] = useState({
    userId: authService.getUserId() || null,
    name: authService.getCurrentUser()?.userName || 'User',
    virtualBalance: 100000
  });

  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cryptos, setCryptos] = useState([]);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [loading, setLoading] = useState(false);



  // Fetch initial data
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(prev => ({
        ...prev,
        userId: currentUser.userId,
        name: currentUser.userName
      }));
      fetchInitialData(currentUser.userId);
    }
  }, []);

  const fetchInitialData = async (userId) => {
    setLoading(true);
    await Promise.all([
      fetchCryptoList(),
      fetchPortfolio(userId),
      fetchTransactions(userId),
      fetchAccountInfo(userId)
    ]);
    setLoading(false);
  };

  const fetchCryptoList = async () => {
    try {
      const res = await api.get("/crypto/crypto-currency");

      const flatList = Array.isArray(res.data)
        ? res.data.map(c => ({
          id: c.cryptoId,
          name: c.currencyName,
          symbol: c.currencySymbol,
          price: c.currencyPrice,
          change: c.dayChange || 0 // Added safety for change check
        }))
        : [];

      setCryptos(flatList);
    } catch (err) {
      console.error("Crypto list error", err);
      setCryptos([]);
    }
  };

  const fetchPortfolio = async (userId) => {
    try {
      const response = await api.get(`/paper/portfolio/${userId}`);
      // Map portfolio data to ensure correct property names for UI
      const mappedPortfolio = (response.data || []).map(item => ({
        id: item.cryptoId, // Ensure ID is mapped if needed for keys
        cryptoId: item.cryptoId,
        name: item.currencyName || item.name || 'Unknown',
        symbol: item.currencySymbol || item.symbol || '???',
        quantity: item.quantity,
        avgPrice: item.averagePrice,
        currentPrice: item.currentPrice,
        ...item
      }));
      setPortfolio(mappedPortfolio);
    } catch (error) {
      console.warn('Error fetching portfolio:', error);
      setPortfolio([]);
    }
  };

  const fetchTransactions = async (userId) => {
    try {
      const response = await api.get(`/paper/transactions/${userId}`);
      setTransactions(response.data || []);
    } catch (error) {
      console.warn('Error fetching transactions:', error);
      setTransactions([]);
    }
  };

  const initializeAccount = async (userId) => {
    try {
      await api.post(`/paper/account/paper-trading/${userId}`);
      // Retry fetching account info after initialization
      const response = await api.get(`/paper/account/${userId}`);
      if (response.data) {
        setUser(prev => ({
          ...prev,
          virtualBalance: response.data.virtualBalance
        }));
      }
    } catch (error) {
      console.error('Error initializing account:', error);
    }
  };

  const fetchAccountInfo = async (userId) => {
    try {
      const response = await api.get(`/paper/account/${userId}`);
      if (response.data) {
        setUser(prev => ({
          ...prev,
          virtualBalance: response.data.virtualBalance
        }));
      }
    } catch (error) {
      console.warn('Error fetching account info:', error);
      // If account not found (404) or other error, try to initialize
      if (error.response && (error.response.status === 404 || error.response.status === 400 || error.response.status === 500)) {
        console.log("Attempting to initialize paper trading account...");
        initializeAccount(userId);
      }
    }
  };

  const handleBuy = () => {
    setShowBuyModal(true);
  };

  const handleSell = () => {
    setShowSellModal(true);
  };

  const executeBuyOrder = async () => {
    if (!selectedCrypto || !buyQuantity || parseFloat(buyQuantity) <= 0) {
      alert('Please select a cryptocurrency and enter valid quantity');
      return;
    }

    setLoading(true);
    try {
      // Using null as body for query param POST
      const response = await api.post(
        `/paper/trade/buy?userId=${user.userId}&cryptoId=${selectedCrypto.id}&quantity=${parseFloat(buyQuantity)}`
      );

      if (response.status === 200 || response.status === 201) {
        alert('Buy order executed successfully!');
        setShowBuyModal(false);
        setBuyQuantity('');
        setSelectedCrypto(null);
        fetchInitialData(user.userId);
      }
    } catch (error) {
      console.error('Error executing buy order:', error);
      alert('Failed to execute buy order: ' + (error.response?.data?.message || error.message || 'Internal Server Error'));
    } finally {
      setLoading(false);
    }
  };

  const executeSellOrder = async (crypto) => {
    const quantityToSell = parseFloat(sellQuantity);
    if (!quantityToSell || quantityToSell <= 0) {
      alert('Please enter valid quantity');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        '/paper/trade/sell',
        {
          userId: user.userId,
          cryptoId: crypto.id,
          quantity: quantityToSell
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Sell order executed successfully!');
        setShowSellModal(false);
        setSellQuantity('');
        fetchInitialData(user.userId);
      }
    } catch (error) {
      console.error('Error executing sell order:', error);
      alert('Failed to execute sell order: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const resetAccount = async () => {
    if (window.confirm('Are you sure you want to reset your paper trading account? All holdings will be cleared and balance reset.')) {
      try {
        await api.post(`/paper/account/reset/${user.userId}`);
        fetchInitialData(user.userId);
        alert('Account reset successfully!');
      } catch (error) {
        console.error('Error resetting account:', error);
        alert('Failed to reset account');
      }
    }
  };

  const calculateTotalPL = () => {
    return portfolio.reduce((total, item) => {
      const currentValue = item.quantity * item.currentPrice;
      const investment = item.quantity * item.avgPrice;
      return total + (currentValue - investment);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Styles Definition
  const styles = {
    paperTrading: {
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
    headerRight: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    btn: {
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
    btnPrimary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.2)',
    },
    btnDanger: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.2)',
    },
    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#e2e8f0',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#3b82f6',
    },
    statContentH3: {
      fontSize: '14px',
      color: '#94a3b8',
      margin: '0 0 8px 0',
      fontWeight: '500',
    },
    statContentH1: {
      fontSize: '24px',
      margin: '0',
      fontWeight: '700',
      color: '#fff',
    },
    tradingGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      marginBottom: '24px',
    },
    card: {
      background: 'linear-gradient(180deg, #1a1f26, #141922)',
      borderRadius: '16px',
      border: 'none', // Removed border to match Home theme or keep subtle
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
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#fff',
    },
    cardBody: {
      padding: '24px',
    },
    // Table Styles
    tableResponsive: {
      overflowX: 'auto',
    },
    customTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      color: '#94a3b8',
      fontWeight: '600',
      fontSize: '13px',
      borderBottom: '1px solid #334155',
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
    // Market Watch
    marketList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    marketItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.02)',
      cursor: 'pointer',
      border: '1px solid transparent',
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
    modalFooter: {
      padding: '20px 24px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    formControl: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
    },
    priceDisplay: {
      padding: '10px 14px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: '600',
    },
    label: {
      display: 'block',
      color: '#94a3b8',
      marginBottom: '8px',
      fontSize: '13px',
    },
    textSuccess: { color: '#10b981' },
    textDanger: { color: '#ef4444' },
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
    <div style={styles.paperTrading}>
      {/* Header */}
      <div style={styles.header}>
        <div className="header-left">
          <h1 style={styles.headerLeftH1}><FaWallet /> Paper Trading</h1>
          <p style={styles.textMuted}>Practice trading with virtual money</p>
        </div>
        <div style={styles.headerRight}>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleBuy}>
            <FaShoppingCart /> Buy
          </button>
          <button style={{ ...styles.btn, ...styles.btnDanger }} onClick={handleSell}>
            <FaMoneyBillWave /> Sell
          </button>
          <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={resetAccount}>
            <FaRedo /> Reset Account
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaWallet />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Virtual Balance</h3>
            <h1 style={{ ...styles.statContentH1, background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{formatCurrency(user.virtualBalance)}</h1>
            {/* Using inline style override for gradient text since it's specific */}
            <p style={styles.textMuted}>Available for trading</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Total P&L</h3>
            <h1 style={{ ...styles.statContentH1, color: calculateTotalPL() >= 0 ? '#10b981' : '#ef4444' }}>
              {calculateTotalPL() >= 0 ? '+' : ''}{formatCurrency(calculateTotalPL())}
            </h1>
            <p style={styles.textMuted}>
              <span style={{ color: calculateTotalPL() >= 0 ? '#10b981' : '#ef4444' }}>
                {portfolio.length > 0 ?
                  `${((calculateTotalPL() / (portfolio.reduce((t, i) => t + (i.quantity * i.avgPrice), 0)) * 100) || 0).toFixed(2)}%` :
                  '0%'
                }
              </span> overall
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <FaCoins />
          </div>
          <div className="stat-content">
            <h3 style={styles.statContentH3}>Holdings</h3>
            <h1 style={styles.statContentH1}>{portfolio.length}</h1>
            <p style={styles.textMuted}>Active Assets</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.tradingGrid}>
        {/* Portfolio Section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}><FaChartPie style={{ color: '#3b82f6' }} /> Current Portfolio</h3>
          </div>
          <div style={styles.cardBody}>
            {portfolio.length === 0 ? (
              <div style={styles.emptyState}>
                <FaChartPie style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                <p>No holdings yet</p>
                <small style={styles.textMuted}>Buy some crypto to get started</small>
              </div>
            ) : (
              <div style={styles.tableResponsive}>
                <table style={styles.customTable}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Asset</th>
                      <th style={styles.th}>Quantity</th>
                      <th style={styles.th}>Avg. Price</th>
                      <th style={styles.th}>Value</th>
                      <th style={styles.th}>P&L</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((item) => (
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
                        <td style={styles.td}>{formatCurrency(item.avgPrice)}</td>
                        <td style={styles.td}>{formatCurrency(item.quantity * item.currentPrice)}</td>
                        <td style={styles.td}>
                          <span style={{ color: item.currentPrice >= item.avgPrice ? '#10b981' : '#ef4444' }}>
                            {formatCurrency((item.currentPrice - item.avgPrice) * item.quantity)}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button
                            style={{ ...styles.btn, ...styles.btnDanger, padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => {
                              setSelectedCrypto({ id: item.cryptoId, name: item.name, price: item.currentPrice });
                              setShowSellModal(true);
                            }}
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Market Watch */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderH3}><FaEye style={{ color: '#3b82f6' }} /> Market Watch</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.marketList}>
              {cryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  style={styles.marketItem}
                  onClick={() => {
                    setSelectedCrypto(crypto);
                    setShowBuyModal(true);
                  }}
                >
                  <div style={styles.assetInfo}>
                    <div style={styles.cryptoIcon}>
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ color: '#fff' }}>{crypto.name}</strong>
                      <br />
                      <small style={styles.textMuted}>{crypto.symbol}</small>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', fontSize: '15px', color: '#fff' }}>{formatCurrency(crypto.price)}</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: crypto.change >= 0 ? '#10b981' : '#ef4444' }}>
                      {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{ ...styles.card, marginTop: '24px' }}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardHeaderH3}><FaHistory style={{ color: '#3b82f6' }} /> Recent Activity</h3>
        </div>
        <div style={styles.cardBody}>
          {transactions.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No recent activity</p>
            </div>
          ) : (
            <div style={styles.tableResponsive}>
              <table style={styles.customTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Asset</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id}>
                      <td style={styles.td}>{new Date(tx.date).toLocaleDateString()}</td>
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
                      <td style={styles.td}>{tx.asset}</td>
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
          )}
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaShoppingCart /> Buy Cryptocurrency</h3>
              <button
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowBuyModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Cryptocurrency</label>
                <select
                  style={styles.formControl}
                  value={selectedCrypto?.id || ''}
                  onChange={(e) => {
                    const crypto = cryptos.find(c => c.id === parseInt(e.target.value));
                    setSelectedCrypto(crypto);
                  }}
                >
                  <option value="">Select a cryptocurrency</option>
                  {cryptos.map(crypto => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCrypto && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Current Price</label>
                    <div style={styles.priceDisplay}>
                      {formatCurrency(selectedCrypto.price)}
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Quantity</label>
                    <input
                      type="number"
                      style={styles.formControl}
                      placeholder="0.00"
                      min="0.0001"
                      step="0.0001"
                      value={buyQuantity}
                      onChange={(e) => setBuyQuantity(e.target.value)}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Total Amount</label>
                    <div style={styles.priceDisplay}>
                      {formatCurrency((parseFloat(buyQuantity) || 0) * selectedCrypto.price)}
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Available Balance</label>
                    <div style={{ ...styles.priceDisplay, color: '#10b981' }}>
                      {formatCurrency(user.virtualBalance)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={styles.modalFooter}>
              <button
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={() => setShowBuyModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.btn, ...styles.btnPrimary, opacity: (loading || !selectedCrypto || !buyQuantity) ? 0.7 : 1 }}
                onClick={executeBuyOrder}
                disabled={loading || !selectedCrypto || !buyQuantity}
              >
                {loading ? 'Processing...' : 'Confirm Buy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedCrypto && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaMoneyBillWave /> Sell Cryptocurrency</h3>
              <button
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => {
                  setShowSellModal(false);
                  setSelectedCrypto(null);
                  setSellQuantity('');
                }}>
                <FaTimes />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Selling</label>
                <div style={styles.priceDisplay}>
                  {selectedCrypto.name} ({selectedCrypto.symbol})
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Current Price</label>
                <div style={styles.priceDisplay}>
                  {formatCurrency(selectedCrypto.price)}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Available Quantity</label>
                <div style={styles.priceDisplay}>
                  {portfolio.find(p => p.cryptoId === selectedCrypto.id)?.quantity.toFixed(4) || '0.0000'}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Quantity to Sell</label>
                <input
                  type="number"
                  style={styles.formControl}
                  placeholder="0.00"
                  min="0.0001"
                  step="0.0001"
                  max={portfolio.find(p => p.cryptoId === selectedCrypto.id)?.quantity || 0}
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Total Amount</label>
                <div style={styles.priceDisplay}>
                  {formatCurrency((parseFloat(sellQuantity) || 0) * selectedCrypto.price)}
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={() => {
                  setShowSellModal(false);
                  setSelectedCrypto(null);
                  setSellQuantity('');
                }}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.btn, ...styles.btnDanger, opacity: (loading || !sellQuantity) ? 0.7 : 1 }}
                onClick={() => executeSellOrder(selectedCrypto)}
                disabled={loading || !sellQuantity}
              >
                {loading ? 'Processing...' : 'Confirm Sell'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperTrading;

